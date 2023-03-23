#!/bin/bash

# Get the current active version
pwd
EXIST_BLUE=$(docker-compose -p react-blue -f docker-compose.blue.yaml ps | grep Up)

# Set the new version to deploy
if [ -n "$EXIST_BLUE" ]; then
  CURRENT_VERSION="blue"
  NEW_VERSION="green"
else
  CURRENT_VERSION="green"
  NEW_VERSION="blue"
fi

# 새 도커 컴포즈 시작
docker-compose -p doeng-frontend-$NEW_VERSION -f docker-compose.$NEW_VERSION.yaml up -d

sleep 10

# Check the new version
EXIST_AFTER=$(docker-compose -p doeng-frontend-$NEW_VERSION -f docker-compose.$NEW_VERSION.yaml ps | grep Up)

# Switch traffic to the new version
if [ -n "$EXIST_AFTER" ]; then

    # nginx.config 변경
    rm /etc/nginx/sites-enabled/doeng-front-$CURRENT_VERSION.conf
    ln -s /etc/nginx/sites-available/doeng-front-$NEW_VERSION.conf /etc/nginx/sites-enabled/doeng-front-$NEW_VERSION.conf
    docker exec doeng-nginx nginx -s reload

    # 이전 도커 컴포즈 종료 및 삭제(--rmi 포함)
    docker-compose -p doeng-frontend-$CURRENT_VERSION -f docker-compose.$CURRENT_VERSION.yaml down --rmi all
fi

echo The new docker-compose failed to start

#

# # Get the current active version
# pwd
# EXIST_BLUE=$(docker-compose -p react-blue -f docker-compose.blue.yaml ps | grep Up)

# # Set the new version to deploy
# if [ -n "$EXIST_BLUE" ]; then
#   CURRENT_VERSION="blue"
#   NEW_VERSION="green"
# else
#   CURRENT_VERSION="green"
#   NEW_VERSION="blue"
# fi

# # Start the new version of the app in detached mode
# docker-compose -p react-$NEW_VERSION -f docker-compose.$NEW_VERSION.yaml up -d

# sleep 10

# # Check the new version
# EXIST_AFTER=$(docker-compose -p react-${NEW_VERSION} -f docker-compose.${NEW_VERSION}.yaml ps | grep Up)

# # Switch traffic to the new version
# if [ -n "$EXIST_AFTER" ]; then

#     # # nginx.config 변경
#     # rm /etc/nginx/sites-enabled/doeng-front-$CURRENT_VERSION.conf
#     # ln -s /etc/nginx/sites-available/doeng-front-$NEW_VERSION.conf /etc/nginx/sites-enabled/doeng-front-$NEW_VERSION.conf
#     # nginx -s reload

#     # 이전 컨테이너 종료
#     docker-compose -p react-$CURRENT_VERSION -f docker-compose.$CURRENT_VERSION.yaml down
#     # 이전 이미지 삭제
#     echo "$CURRENT_VERSION down"
# fi