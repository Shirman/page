# TsingChan
from qiniu import Auth, put_file, etag, urlsafe_base64_encode, BucketManager
from typing import List, Dict
import os
from qiniu import build_batch_delete
class Sync:
    """
    同步目录至七牛云
    """
    def __init__(
        self,
        access_key: str,
        secret_key: str,
        bucket_name: str,
        sync_dir: str,
        exclude: List,
        cover: bool,
        remove_redundant: bool,
    ):
        self.bucket_name = bucket_name
        self.q = Auth(access_key, secret_key)
        self.bucket = BucketManager(self.q)
        self.sync_dir = sync_dir
        self.exclude = exclude
        self.cover = cover
        self.remove_redundant = remove_redundant
        self.sync()
    def sync(self):
        """
        同步操作
        :return:
        """
        remote_files = self.list_remote()
        local_files = self.list_local()
        # 首先删除远端仓库中多余的文件
        remove_remote_files = []
        remove_count = 0
        put_count = 0
        for remote_filename in remote_files:
            if remote_filename not in local_files:
                remove_remote_files.append(remote_filename)                
                remove_count += 1
                print("remve " + str(remove_count) + " => " + remote_filename);
        self.bucket.batch(build_batch_delete(self.bucket_name, remove_remote_files))
        # 上传本地文件到远端(仅上传远端不存在的以及修改过的)
        for local_filename in local_files:
            if (
                local_filename not in remote_files
                or local_files[local_filename]["hash"]
                != remote_files[local_filename]["hash"]
            ):                
                ret, info = put_file(
                    self.q.upload_token(self.bucket_name, local_filename, 3600),
                    local_filename,
                    local_files[local_filename]["fullpath"],
                )                
                put_count += 1
                print("puting " + str(put_count) + " => " + local_filename)                
    def list_remote(self) -> Dict:
        """
        列出远程仓库所有的文件信息
        :return: List
        """
        result = {}
        for file in self.bucket.list(self.bucket_name)[0]["items"]:
            if(file["mimeType"] not in ["image/png","image/jpg","image/jpeg","image/gif"]):
                result[file["key"]] = file
        return result
    def list_local(self) -> Dict:
        """
        列出本地仓库所有的文件信息
        """
        files = {}
        def get_files(path):
            for filename in os.listdir(path):
                if filename in self.exclude:
                    continue
                fullpath = os.path.join(path, filename)
                if os.path.isfile(fullpath):
                    key = fullpath.split(self.sync_dir)[1]
                    files[key] = {"fullpath": fullpath, "hash": etag(fullpath)}
                else:
                    get_files(fullpath)
        get_files(self.sync_dir)
        return files
if __name__ == "__main__":
    Sync(
        access_key="xxxxx",  # access_key
        secret_key="xxxx",  # secret_key
        bucket_name="xxxx",  # bucket_name
        sync_dir="/www/xxxx/", # 静态文件目录(后面必须有斜杠/)
        exclude=[".DS_Store"],
        cover=True,
        remove_redundant=True,
    )