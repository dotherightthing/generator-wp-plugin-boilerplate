# WordPress Plugin Boilerplate

A best-practice boilerplate for plugin development.

## Installation

### A. Install [Yeoman](http://yeoman.io/)

```
sudo npm install -g yo
```

### B. Install [Composer](https://getcomposer.org/)

<https://getcomposer.org/download/>

### C. Create a folder for the plugin

Then launch Terminal from this folder.

### D. Scaffold project and install dependencies

```
sudo npm link

yo wp-plugin-boilerplate
```

--

### Notes

#### Testing

PHPUnit is currently at version 6.1, but this project uses the Old Stable Release of 5.7 to work with PHP 5.6. This version is supported until February 2018, see https://phpunit.de/.

#### Publishing

The plugin name should not include the word 'plugin'

##### `readme.txt`

The headings correspond to the horizontal tabs that display on a plugin detail page on <http://wordpress.org/plugins>:

* Description
* Installation
* FAQ
* Screenshots
* Changelog

The remaining tabs are dynamically generated by WordPress.org:

* Stats
* Support
* Reviews
* Developers

[More about the readme](https://wordpress.org/plugins/developers/#readme)

#### Translation

`.pot` files are generated using [https://developer.wordpress.org/themes/functionality/localization/#wordpress-i18n-tools](WordPress i18n tools)

## References

* [How to Build a WordPress Plugin](https://teamtreehouse.com/library/how-to-build-a-wordpress-plugin)
* [WordPress-Plugin-Boilerplate](https://github.com/DevinVinson/WordPress-Plugin-Boilerplate/)
* [Create A Custom Yeoman Generator in 4 Easy Steps](https://scotch.io/tutorials/create-a-custom-yeoman-generator-in-4-easy-steps)

