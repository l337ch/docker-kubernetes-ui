FROM google/nodejs
MAINTAINER Lee Chang <leetchang@gmail.com>

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y supervisor

ADD etc/supervisor/conf.d/kubernetes-ui.conf /etc/supervisor/conf.d/kubernetes-ui.conf

ADD www /opt/www

WORKDIR /opt/www/master

RUN npm install

RUN npm install -g http-server

# Allow bower to run as root
ADD root/.bowerrc /root/.bowerrc

EXPOSE 8900

CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/supervisord.conf"]