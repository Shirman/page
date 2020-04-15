
<!-- TOC -->

- [前言](#前言)
- [相关资料](#相关资料)
- [理论整理](#理论整理)
    - [概念](#概念)
    - [学习三部曲](#学习三部曲)
- [手势识别实践](#手势识别实践)
    - [结构](#结构)
    - [编码](#编码)

<!-- /TOC -->

## 前言

目前流行的几个深度学习框架，Google的TensorFlow，Facebook的Pytorch，国内的有百度的PaddlePaddle，中文名：飞桨。本系列文章结合百度AI Studio学院的免费培训，整理每次学习资料及心得，希望对大家有所帮助。

本文主要整理关于PaddlePaddle应用于图像处理，以手势识别作为实践案例。


## 相关资料

- 理论文档版

深度学习解析：
https://aistudio.baidu.com/aistudio/education/preview/250956


- 理论视频版

深度学习与图像处理：
https://aistudio.baidu.com/aistudio/education/lessonvideo/243507

- 实践视频版

手势识别：
https://aistudio.baidu.com/aistudio/education/lessonvideo/243533


## 理论整理

小白对于深度学习害怕的部分原因就是很多术语，难以理解，通过本次视频教学，小白们可以多少了解部分术语的含义，减少对于深度学习了解的恐惧。

小白还可以通过本次学习，了解深度学习的发展及一些浅显的原理，特别是模型、神经网络、特征、网络有一些基本的认识。

### 概念
- 什么是深度学习
- 神经网络函数
- 机器学习模型
- 特征空间：
- 测量空间
- 深度学习的是什么，目的是什么：寻找一个合适的函数，让输入和输出尽量的一致
- 如何使用深度学习解决图像识别
- 输入层
- 隐藏层
- 输出层
- 损失函数
- 激活函数
- 偏置
- 神经元
- softmax
- DNN/CNN/RNN

### 学习三部曲
- 建立模型：选择/建立网络结构模型，确定层数、神经元数
- 损失函数：常用平方误差、交叉熵等损失函数
- 参数学习：梯度下降、反向传播算法
- 

> 由于百度飞桨深度学习学院视频中陈老师讲的很好，通俗易懂，这里就罗列，还是建议去看陈老师的视频，更形象易理解。

## 手势识别实践

### 结构

- 定义训练与测试数据提供器
    - 定义数据读取器
- 定义网络，比如DNN/CNN/RNN
- 训练得到模型
- 模型校验
- 模型预测   

### 编码

> 以下代码请在AIStudio上执行

AI Studio上提供了dataset，可以手动解压，也可以执行下面代码

```
!cd /home/aistudio/data/data23668 && unzip -qo Dataset.zip

```

导入相关类库
```
import os
import time
import random
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt
import paddle
import paddle.fluid as fluid
import paddle.fluid.layers as layers
from multiprocessing import cpu_count
from paddle.fluid.dygraph import Pool2D,Conv2D
from paddle.fluid.dygraph import Linear
```


生成图像列表
```

# 生成图像列表
data_path = '/home/aistudio/data/data23668/Dataset'
character_folders = os.listdir(data_path)
# print(character_folders)
if(os.path.exists('./train_data.list')):
    os.remove('./train_data.list')
if(os.path.exists('./test_data.list')):
    os.remove('./test_data.list')
    
for character_folder in character_folders:
    
    with open('./train_data.list', 'a') as f_train:
        with open('./test_data.list', 'a') as f_test:
            if character_folder == '.DS_Store':
                continue
            character_imgs = os.listdir(os.path.join(data_path,character_folder))
            count = 0 
            for img in character_imgs:
                if img =='.DS_Store':
                    continue
                if count%10 == 0:
                    f_test.write(os.path.join(data_path,character_folder,img) + '\t' + character_folder + '\n')
                else:
                    f_train.write(os.path.join(data_path,character_folder,img) + '\t' + character_folder + '\n')
                count +=1
print('列表已生成')
```

定义训练集和测试集的reader
```
# 定义训练集和测试集的reader
def data_mapper(sample):
    img, label = sample
    img = Image.open(img)
    img = img.resize((100, 100), Image.ANTIALIAS)
    img = np.array(img).astype('float32')
    img = img.transpose((2, 0, 1))
    img = img/255.0
    return img, label

def data_reader(data_list_path):
    def reader():
        with open(data_list_path, 'r') as f:
            lines = f.readlines()
            for line in lines:
                img, label = line.split('\t')
                yield img, int(label)
    return paddle.reader.xmap_readers(data_mapper, reader, cpu_count(), 512)
 
```
定义数据提供器
```
# 用于训练的数据提供器
train_reader = paddle.batch(reader=paddle.reader.shuffle(reader=data_reader('./train_data.list'), buf_size=256), batch_size=32)
# 用于测试的数据提供器
test_reader = paddle.batch(reader=data_reader('./test_data.list'), batch_size=32) 
```
定义DNN网络（全连接），可以根据PaddlePaddle上的文档选择更优的激活函数，比如relu、leaky_relu等
```
#定义DNN网络
class MyDNN(fluid.dygraph.Layer):
    def __init__(self):
        super(MyDNN,self).__init__()
        self.hidden1 = Linear(100,100,act='relu')
        self.hidden2 = Linear(100,100,ac    t='relu')
        self.hidden3 = Linear(100,100,act='relu')
        self.hidden4 = Linear(3*100*100,10,act="softmax")
    def forward(self,input):
        x = self.hidden1(input)
        x = self.hidden2(x)
        x = self.hidden3(x)
        x = fluid.layers.reshape(x,shape=[-1,3*100*100])
        y = self.hidden4(x)
        return y
```

训练（默认使用SGD优化器，也可使用Adm或Adagrad等优化）

```
#用动态图进行训练
with fluid.dygraph.guard():
    model=MyDNN() #模型实例化
    model.train() #训练模式
    opt=fluid.optimizer.SGDOptimizer(learning_rate=0.001, parameter_list=model.parameters())#优化器选用SGD随机梯度下降，学习率为0.001.

    epochs_num=10 #迭代次数
    
    for pass_num in range(epochs_num):
        
        for batch_id,data in enumerate(train_reader()):
            
            images=np.array([x[0].reshape(3,100,100) for x in data],np.float32)
            
            labels = np.array([x[1] for x in data]).astype('int64')
            labels = labels[:, np.newaxis]
            # print(images.shape)
            image=fluid.dygraph.to_variable(images)
            label=fluid.dygraph.to_variable(labels)
            predict=model(image)#预测
            # print(predict)
            loss=fluid.layers.cross_entropy(predict,label)
            avg_loss=fluid.layers.mean(loss)#获取loss值
            
            acc=fluid.layers.accuracy(predict,label)#计算精度
            
            if batch_id!=0 and batch_id%50==0:
                print("train_pass:{},batch_id:{},train_loss:{},train_acc:{}".format(pass_num,batch_id,avg_loss.numpy(),acc.numpy()))
            
            avg_loss.backward()
            opt.minimize(avg_loss)
            model.clear_gradients()
            
    fluid.save_dygraph(model.state_dict(),'MyDNN')#保存模型
 
```

校验（使用测试集数据验证模型可靠性）
```
#模型校验
with fluid.dygraph.guard():
    accs = []
    model_dict, _ = fluid.load_dygraph('MyDNN')
    model = MyDNN()
    model.load_dict(model_dict) #加载模型参数
    model.eval() #训练模式
    for batch_id,data in enumerate(test_reader()):#测试集
        images=np.array([x[0].reshape(3,100,100) for x in data],np.float32)
        labels = np.array([x[1] for x in data]).astype('int64')
        labels = labels[:, np.newaxis]

        image=fluid.dygraph.to_variable(images)
        label=fluid.dygraph.to_variable(labels)
        
        predict=model(image)       
        acc=fluid.layers.accuracy(predict,label)
        accs.append(acc.numpy()[0])
        avg_acc = np.mean(accs)
    print(avg_acc)
```
实际应用，进行手势图片预测（机器识别图片中的数字）
```
#读取预测图像，进行预测

def load_image(path):
    img = Image.open(path)
    img = img.resize((100, 100), Image.ANTIALIAS)
    img = np.array(img).astype('float32')
    img = img.transpose((2, 0, 1))
    img = img/255.0
    print(img.shape)
    return img

#构建预测动态图过程
with fluid.dygraph.guard():
    infer_path = '手势.JPG'
    model=MyDNN()#模型实例化
    model_dict,_=fluid.load_dygraph('MyDNN')
    model.load_dict(model_dict)#加载模型参数
    model.eval()#评估模式
    infer_img = load_image(infer_path)
    infer_img=np.array(infer_img).astype('float32')
    infer_img=infer_img[np.newaxis,:, : ,:]
    infer_img = fluid.dygraph.to_variable(infer_img)
    result=model(infer_img)
    display(Image.open('手势.JPG'))
    print(np.argmax(result.numpy()))
```

![手势识别结果](/image/paddle/手势识别结果.png)

-----
@tsingchan 2020