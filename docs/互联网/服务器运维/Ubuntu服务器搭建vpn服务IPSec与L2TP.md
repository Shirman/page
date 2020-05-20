<!-- TOC -->

- [Update](#update)
- [Installation](#installation)
- [Usage](#usage)
- [Manage Accounts:](#manage-accounts)
- [How to use on client:](#how-to-use-on-client)

<!-- /TOC -->

*Setup a Strongswan IPSec (& L2TP) Server*

**System: Ubuntu 14.04**

### Update ###

	sudo apt-get update

Note: Check whether the curl is installed.

### Installation ###

This script doesn't need a domain or specific public IP to work.

	curl -L -O https://raw.github.com/philplckthun/setup-strong-strongswan/master/setup.sh
	chmod +x setup.sh
	sudo ./setup.sh

The script will lead you through the installation process. If you haven't run this script before it will ask you to enter credentials for the VPN, namely:

> a username
> 
> a password
> 
> a PSK (pre-shared key)

For upgrading Strongswan you can just run the script again. Remember to back up your custom IPSec configuration files beforehand.

### Usage ###

This installs the vpn-assist init.d script. Systemd is backwards compatible to these scripts and thus you can use it to **start|stop|restart** the VPN server, which should also start itself automatically on startup.

So you can stop and than start it:

	sudo service vpn-assist stop
	sudo service vpn-assist start
	//>sudo service vpn-assist restart


### Manage Accounts: ###
You can manage accounts for your VPN via **/etc/ipsec.secrets** and **/etc/ppp/chap-secrets**. 

**Of  course you can also  use the script to add new count :**

	wget https://raw.githubusercontent.com/zackdevine/setup-strongswan-vpn-account/master/setup-vpn-account.sh
	sudo chmod +x setup-vpn-account.sh
	sudo ./setup-vpn-account.sh

This script will automatically backup /etc/ipsec.secrets and /etc/ppp/chap-secrets before adding a new VPN account.


> Note: if you have instatlled pptpd service ,the config file /etc/ppp/chap-secrets would influence pptpd service account and pwd.

### How to use on client: ###

	Vpn type:  	L2TP or IPSec
	Server : 	server ip
	User: 		account username
	Password: 	account password
	Secret Key: PSK


----------
@tsingchan