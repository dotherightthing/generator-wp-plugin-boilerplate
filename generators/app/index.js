/*jslint node: true, esversion:6 */

'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
    prompting() {

        this.log(yosay(
          'Welcome to the ' + chalk.red('WordPress Plugin boilerplate') + ' generator!'
        ));

        const prompts = [
            {
                type: 'input',
                name: 'pluginName',
                message: 'Plugin name (file safe)',
                default: this.config.get('pluginName')
            },
            {
                type: 'input',
                name: 'pluginNameSafe',
                message: 'Plugin name (function safe)',
                default: this.config.get('pluginNameSafe')
            },
            {
                type: 'input',
                name: 'pluginNameFriendly',
                message: 'Plugin name (friendly)',
                default: this.config.get('pluginNameFriendly')
            },
            {
                type: 'input',
                name: 'pluginNameFriendlySafe',
                message: 'Plugin name (friendly & function safe)',
                default: this.config.get('pluginNameFriendlySafe')
            },
            {
                type: 'input',
                name: 'pluginNameAdminMenu',
                message: 'Plugin name (admin menu)',
                default: this.config.get('pluginNameAdminMenu')
            },
            {
                type: 'input',
                name: 'pluginUrlAdminMenu',
                message: 'Plugin URL (admin menu)',
                default: this.config.get('pluginUrlAdminMenu')
            },
            {
                type: 'input',
                name: 'pluginDescription',
                message: 'Plugin description',
                default: this.config.get('pluginDescription')
            },
            {
                type: 'input',
                name: 'pluginTags',
                message: 'Plugin tags',
                default: this.config.get('pluginTags')
            },
            {
                type: 'input',
                name: 'pluginUrl',
                message: 'Plugin URL',
                default: this.config.get('pluginUrl')
            },
            {
                type: 'input',
                name: 'pluginLicense',
                message: 'Plugin License',
                default: this.config.get('pluginLicense')
            },
            {
                type: 'input',
                name: 'pluginLicenseUrl',
                message: 'Plugin License URL',
                default: this.config.get('pluginLicenseUrl')
            },
            {
                type: 'input',
                name: 'pluginDonateUrl',
                message: 'Plugin Donate URL',
                default: this.config.get('pluginDonateUrl')
            },
            {
                type: 'input',
                name: 'wpVersion',
                message: 'WordPress version',
                default: this.config.get('wpVersion')
            },
            {
                type: 'input',
                name: 'authorName',
                message: 'Your first and last names',
                default: this.config.get('authorName')
            },
            {
                type: 'input',
                name: 'authorWordPressName',
                message: 'Your WordPress.org username',
                default: this.config.get('authorWordPressName')
            },
            {
                type: 'input',
                name: 'authorEmail',
                message: 'Your email address',
                default: this.config.get('authorEmail')
            },
            {
                type: 'input',
                name: 'authorUrl',
                message: 'Author URL',
                default: this.config.get('authorUrl')
            },
            {
                type: 'input',
                name: 'pluginRepositoryType',
                message: 'Version control system (git/svn)',
                default: this.config.get('pluginRepositoryType')
            },
            {
                type: 'input',
                name: 'pluginRepositoryUrl',
                message: 'Repository Url',
                default: this.config.get('pluginRepositoryUrl')
            }
        ];

        return this.prompt(prompts).then(props => {
          // To access props later use this.props.someAnswer;
          this.props = props;
        });
    }

    writing() {
        // Copy the configuration files

        // Security

        this.fs.copy(
            this.templatePath('_index.php'),
            this.destinationPath('index.php')
        );

        // Bower

        this.fs.copy(
            this.templatePath('_.bowerrc'),
            this.destinationPath('.bowerrc')
        );

        this.fs.copyTpl(
            this.templatePath('_bower.json'),
            this.destinationPath('bower.json'), {
                name:           this.props.pluginName,
                description:    this.props.pluginDescription,
                authorName:     this.props.authorName,
                authorEmail:    this.props.authorEmail,
                authorUrl:      this.props.authorUrl,
                homepage:       this.props.pluginUrl
            }
        );

        // Git
        this.fs.copy(
            this.templatePath('_.gitignore'),
            this.destinationPath('.gitignore')
        );

        // Composer

        this.fs.copy(
            this.templatePath('_composer.json'),
            this.destinationPath('composer.json')
        );

        this.fs.copy(
            this.templatePath('_composer.lock'),
            this.destinationPath('composer.lock')
        );

        // Gulp

        this.fs.copy(
            this.templatePath('_gulpfile.js'),
            this.destinationPath('gulpfile.js')
        );

        // NPM
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'), {
                name:                   this.props.pluginName,
                description:            this.props.pluginDescription,
                repositoryType:         this.props.pluginRepositoryType,
                repositoryUrl:          this.props.pluginRepositoryUrl,
                authorName:             this.props.authorName,
                authorEmail:            this.props.authorEmail,
                authorUrl:              this.props.authorUrl,
                homepage:               this.props.pluginUrl,
                srcDir:                 process.cwd()
            }
        );

        // APP
        // --------

        // http://yeoman.io/authoring/file-system.html - Location contexts:
        // [dest] is defined as either the current working directory
        // or the closest parent folder containing a .yo-rc.json

        // root

        this.fs.copyTpl(
            this.templatePath('_readme.txt'),
            this.destinationPath('readme.txt'), {
                authorWordPressName:    this.props.authorWordPressName,
                pluginTags:             this.props.pluginTags,
                description:            this.props.pluginDescription,
                name:                   this.props.pluginName,
                nameFriendly:           this.props.pluginNameFriendly,
                wpVersion:              this.props.wpVersion,
                pluginLicense:          this.props.pluginLicense,
                pluginLicenseUrl:       this.props.pluginLicenseUrl,
                pluginDonateUrl:        this.props.pluginDonateUrl
            }
        );

        this.fs.copyTpl(
            this.templatePath('_uninstall.php'),
            this.destinationPath('uninstall.php'), {
                name: this.props.pluginName,
                nameFriendlySafe: this.props.pluginNameFriendlySafe
            }
        );

        this.fs.copyTpl(
            this.templatePath('_wpdtrt-plugin-boilerplate.php'),
            this.destinationPath(this.props.pluginName + '.php'), {
                name:                   this.props.pluginName,
                nameFriendly:           this.props.pluginNameFriendly,
                nameSafe:               this.props.pluginNameSafe,
                authorName:             this.props.authorName,
                authorUrl:              this.props.authorUrl,
                pluginLicense:          this.props.pluginLicense,
                pluginUrl:              this.props.pluginUrl,
                description:            this.props.pluginDescription,
                constantStub:           this.props.pluginNameFriendlySafe.toUpperCase()
            }
        );

        // app

        this.fs.copyTpl(
            this.templatePath('app/_index.php'),
            this.destinationPath('app/index.php')
        );

        this.fs.copyTpl(
            this.templatePath('app/_wpdtrt-plugin-boilerplate-css.php'),
            this.destinationPath('app/' + this.props.pluginName + '-css.php'), {
                name:                   this.props.pluginName,
                nameFriendlySafe:       this.props.pluginNameFriendlySafe,
                nameSafe:               this.props.pluginNameSafe,
                constantStub:           this.props.pluginNameFriendlySafe.toUpperCase(),
                pluginUrl:              this.props.pluginUrl
            }
        );

        this.fs.copyTpl(
            this.templatePath('app/_wpdtrt-plugin-boilerplate-data.php'),
            this.destinationPath('app/' + this.props.pluginName + '-data.php'), {
                nameFriendlySafe:       this.props.pluginNameFriendlySafe,
                nameSafe:               this.props.pluginNameSafe,
                pluginUrl:              this.props.pluginUrl
            }
        );

        this.fs.copyTpl(
            this.templatePath('app/_wpdtrt-plugin-boilerplate-js.php'),
            this.destinationPath('app/' + this.props.pluginName + '-js.php'), {
                name:                   this.props.pluginName,
                nameSafe:               this.props.pluginNameSafe,
                nameFriendlySafe:       this.props.pluginNameFriendlySafe,
                pluginUrl:              this.props.pluginUrl,
                constantStub:           this.props.pluginNameFriendlySafe.toUpperCase()
            }
        );

        this.fs.copyTpl(
            this.templatePath('app/_wpdtrt-plugin-boilerplate-options-page.php'),
            this.destinationPath('app/' + this.props.pluginName + '-options-page.php'), {
                name:                   this.props.pluginName,
                nameSafe:               this.props.pluginNameSafe,
                nameFriendly:           this.props.pluginNameFriendly,
                nameFriendlySafe:       this.props.pluginNameFriendlySafe,
                nameAdminMenu:          this.props.pluginNameAdminMenu,
                pluginUrl:              this.props.pluginUrl,
                pluginUrlAdminMenu:     this.props.pluginUrlAdminMenu,
                constantStub:           this.props.pluginNameFriendlySafe.toUpperCase()
            }
        );

        this.fs.copyTpl(
            this.templatePath('app/_wpdtrt-plugin-boilerplate-shortcode.php'),
            this.destinationPath('app/' + this.props.pluginName + '-shortcode.php'), {
                name:                   this.props.pluginName,
                nameSafe:               this.props.pluginNameSafe,
                nameFriendlySafe:       this.props.pluginNameFriendlySafe,
                pluginUrl:              this.props.pluginUrl,
                constantStub:           this.props.pluginNameFriendlySafe.toUpperCase()
            }
        );

        this.fs.copyTpl(
            this.templatePath('app/_wpdtrt-plugin-boilerplate-widget.php'),
            this.destinationPath('app/' + this.props.pluginName + '-widget.php'), {
                name:                   this.props.pluginName,
                nameSafe:               this.props.pluginNameSafe,
                nameFriendly:           this.props.pluginNameFriendly,
                nameFriendlySafe:       this.props.pluginNameFriendlySafe,
                pluginUrl:              this.props.pluginUrl,
                constantStub:           this.props.pluginNameFriendlySafe.toUpperCase()
            }
        );

        // languages

        this.fs.copy(
            this.templatePath('languages/_wpdtrt-plugin-boilerplate.pot'),
            this.destinationPath('languages/' + this.props.pluginName + '.pot')
        );

        // views

        this.fs.copy(
            this.templatePath('views/_index.php'),
            this.destinationPath('views/index.php')
        );

        // admin

        this.fs.copy(
            this.templatePath('views/admin/_index.php'),
            this.destinationPath('views/admin/index.php')
        );

        this.fs.copyTpl(
            this.templatePath('views/admin/css/_wpdtrt-plugin-boilerplate.css'),
            this.destinationPath('views/admin/css/' + this.props.pluginName + '.css'), {
                name:                   this.props.pluginName,
                nameFriendlySafe:       this.props.pluginNameFriendlySafe,
                pluginUrl:              this.props.pluginUrl
            }
        );

        //this.dest.mkdir(this.folderName + '/views/admin/images');
        //this.dest.mkdir(this.folderName + '/views/admin/js');

        this.fs.copyTpl(
            this.templatePath('views/admin/partials/_wpdtrt-plugin-boilerplate-options-page.php'),
            this.destinationPath('views/admin/partials/' + this.props.pluginName + '-options-page.php'), {
                name:                   this.props.pluginName,
                nameFriendly:           this.props.pluginNameFriendly,
                nameFriendlySafe:       this.props.pluginNameFriendlySafe,
                nameSafe:               this.props.pluginNameSafe,
                pluginUrl:              this.props.pluginUrl
            }
        );

        this.fs.copyTpl(
            this.templatePath('views/admin/partials/_wpdtrt-plugin-boilerplate-widget.php'),
            this.destinationPath('views/admin/partials/' + this.props.pluginName + '-widget.php'), {
                nameFriendly:           this.props.pluginNameFriendly,
                nameFriendlySafe:       this.props.pluginNameFriendlySafe,
                nameSafe:               this.props.pluginNameSafe,
                pluginUrl:              this.props.pluginUrl
            }
        );

        // public

        this.fs.copy(
            this.templatePath('views/public/_index.php'),
            this.destinationPath('views/public/index.php')
        );

        this.fs.copyTpl(
            this.templatePath('views/public/css/_wpdtrt-plugin-boilerplate.css'),
            this.destinationPath('views/public/css/' + this.props.pluginName + '.css'), {
                name:                   this.props.pluginName,
                nameFriendlySafe:       this.props.pluginNameFriendlySafe,
                pluginUrl:              this.props.pluginUrl
            }
        );

        this.fs.copy(
            this.templatePath('views/public/images/_tooltip-arrow.png'),
            this.destinationPath('views/public/images/tooltip-arrow.png')
        );

        this.fs.copy(
            this.templatePath('views/public/images/_treehouse-logo.png'),
            this.destinationPath('views/public/images/treehouse-logo.png')
        );


        this.fs.copyTpl(
            this.templatePath('views/public/js/_wpdtrt-plugin-boilerplate.js'),
            this.destinationPath('views/public/js/' + this.props.pluginName + '.js'), {
                name:                   this.props.pluginName,
                nameSafe:               this.props.pluginNameSafe,
                nameFriendlySafe:       this.props.pluginNameFriendlySafe,
                pluginUrl:              this.props.pluginUrl
            }
        );

        this.fs.copyTpl(
            this.templatePath('views/public/partials/_wpdtrt-plugin-boilerplate-front-end.php'),
            this.destinationPath('views/public/partials/' + this.props.pluginName + '-front-end.php'), {
                name:                   this.props.pluginName,
                nameSafe:               this.props.pluginNameSafe,
                nameFriendlySafe:       this.props.pluginNameFriendlySafe,
                pluginUrl:              this.props.pluginUrl,
                constantStub:           this.props.pluginNameFriendlySafe.toUpperCase()
            }
        );

    }

    install() {
        this.installDependencies({
            npm: true,
            bower: true,
            yarn: false
        });

        this.spawnCommand('composer', ['install']);
    }

};
