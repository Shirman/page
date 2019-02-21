
from https://getcomposer.org/download/


### Command-line installation

To quickly install Composer in the current directory, run the following script in your terminal. To automate the installation, use the guide on installing Composer programmatically.

    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
    php -r "if (hash_file('sha384', 'composer-setup.php') === '48e3236262b34d30969dca3c37281b3b4bbe3221bda826ac6a9a62d6444cdb0dcd0615698a5cbe587c3f0fe57a54d8f5') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
    php composer-setup.php
    php -r "unlink('composer-setup.php');"

This installer script will simply check some php.ini settings, warn you if they are set incorrectly, and then download the latest composer.phar in the current directory. The 4 lines above will, in order:

- Download the installer to the current directory
- Verify the installer SHA-384 which you can also 
cross-check here
- Run the installer
- Remove the installer

>WARNING: Please do not redistribute the install code. It will change with every version of the installer. Instead, please link to this page or check how to install Composer programmatically.

### Installer Options

#### --install-dir

You can install composer to a specific directory by using the ```--install-dir``` option and providing a target directory. Example:

    php composer-setup.php --install-dir=bin

#### --filename
You can specify the filename (default: composer.phar) using the ```--filename``` option. Example:

    php composer-setup.php --filename=composer

#### --version

You can install composer to a specific release by using the ```--version``` option and providing a target release. Example:

    php composer-setup.php --version=1.0.0-alpha8

    