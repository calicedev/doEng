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

# 이전 컨테이너 종료
docker-compose -p react-$CURRENT_VERSION -f docker-compose.$CURRENT_VERSION.yaml down
# 새 컨테이너 시작
docker-compose -p react-$NEW_VERSION -f docker-compose.$NEW_VERSION.yaml up -d

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