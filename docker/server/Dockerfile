FROM php:8.0.2-apache-buster

RUN apt update && apt install -y nano openssh-server zip unzip zlib1g-dev libpng-dev libfreetype6-dev libjpeg62-turbo-dev libicu-dev

# php ext
RUN docker-php-ext-install pdo_mysql \
    intl \
    mysqli \
    opcache

# gd
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install -j$(nproc) gd

# Install Xdebug
# RUN pecl install xdebug
# RUN docker-php-ext-enable xdebug

# apache mods
RUN a2enmod ssl
RUN a2enmod rewrite
RUN a2enmod headers

# composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer self-update 2.2.9

# symfony-cli
RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.deb.sh' | bash
RUN apt install -y symfony-cli

RUN usermod --shell /bin/bash www-data
RUN rm /etc/apache2/sites-enabled/000-default.conf

EXPOSE 80
EXPOSE 443
