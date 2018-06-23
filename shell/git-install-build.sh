#!/bin/bash

codePath="/data/biping_react"
homePath="/data/biping_react"
shellPath="/data/biping_react/shell"
target_path="/data/biping_react/docs"
deploy_path="/data/biping-webapp"
gitOsc="git@git.oschina.net:liangmuxue.oschina.net/tnb-client.git"
index_page="index_publish.html"
env_file="product_env.js"
expectitem="test"
deploy_temp_path="/home/tiannianbao/webapp-temp"

################################# 打包库选择 ##################################
read -p  "生产库（1） 测试环境(2) 退出（3）" choic

if [ $choic -eq 1 ]
then
        echo "打包 生产库"
        deploy_path="/data/bpcoinServer/biping-webapp"
        env_file="product_env.js"
        expectitem="product"
elif [ $choic -eq 2 ]
then
        echo "打包 测试库"
        deploy_path="/data/biping-webapp"
        env_file="test_env.js"
        expectitem="test"
elif [ $choic -eq 3 ]
then
        exit 0
else
        exit 2
fi


################################# GIT拉取最新代码 ##################################
echo  "拉取代码..."
cd $codePath
git stash save "s"
git pull

###################################################################################

#拷贝真正要部署的源配置文件
#......

################################# install and build ##############################################
cd $codePath
echo  "npm install..."
npm install

if [ $choic -eq 1 ]
then
        echo  "npm run build..."
  npm run build
        echo "ok"
elif [ $choic -eq 2 ]
then
        echo  "npm run test..."
        npm run test
        echo "ok"
else
        exit 2
fi

        ################################# 打压缩包 ####################################
        cd $target_path
        echo  "产生对应压缩包..."
        zip -rq webapp.zip *
        cp webapp.zip $deploy_path/webapp.zip
        if [ $choic -eq 1 ]
        then
                expect $shellPath/expect_deploy_$expectitem.sh
        elif [ $choic -eq 2 ]
        then
                cd $deploy_path
                unzip -o webapp.zip
        else
                exit 2
        fi

echo  "ok..."