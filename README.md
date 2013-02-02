# LiceNjs

LiceNjs generates license files. No more hunting down licenses from other projects.

The whole project/idea was inspired/stolen from [jcarbaugh](https://github.com/jcarbaugh/)'s own [lice](https://github.com/jcarbaugh/lice) project and rewritten for us javascript lovers who fear snakes ;)

## Installation

    npm install -g licenjs


## Overview

Generate a BSD-3 license, the default:

    $ licenjs
    Copyright (c) 2013, Arnaud

    All rights reserved.

    Redistribution and use in source and binary forms, with or without modification,
    ...

Generate an MIT license:

    $ licenjs mit
    The MIT License (MIT)
    Copyright (c) 2013 Arnaud

    Permission is hereby granted, free of charge, to any person obtaining a copy
    ...

Generate a BSD-3 license, specifying the year and organization to be used:

    $ licenjs -y 2012 -o "Dream Leaves"
    Copyright (c) 2012, Dream Leaves

    All rights reserved.

    Redistribution and use in source and binary forms, with or without modification,
    ...

If organization is not specified, licenjs will NOT attempt to use `git config` (too lazy to add async to THIS, let's get serious) to find your name. It will ONLY use the value of the $USER environment variable. If the project name is not specified, the name of the current directory is used. Year will default to the current year.

You can see what variables are available to you for any of the licenses:

    $ licenjs --vars mit
    The mit license template contains the following variables:
      year
      organization


## I want _________ license in here!

Great! Is it a license that is commonly used? If so, open an issue or, if you are feeling generous, fork and submit a pull request. (And don't forget to send it back to the original [lice](https://github.com/jcarbaugh/lice) project too!)


## Usage

    usage: licenjs [-h] [-o ORGANIZATION] [-p PROJECT] [-t TEMPLATE_PATH] [-y YEAR]
                   [--vars] [license]

    positional arguments:
      license               the license to generate, one of: agpl3, apache, bsd2,
                            bsd3, cddl, cc0, epl, gpl2, gpl3, lgpl, mit, mpl

    optional arguments:
      -h, --help            show this help message and exit
      -o ORGANIZATION, --org ORGANIZATION
                            organization, defaults to process.env.USER
      -p PROJECT, --proj PROJECT
                            name of project, defaults to name of current directory
      -t TEMPLATE_PATH, --template TEMPLATE_PATH
                            path to license template file (not even remotely implemented)
      -y YEAR, --year YEAR  copyright year
      --vars                list template variables for specified license


## Changelog


### 0.1.2

* Minor fixes

### 0.1

* Initial release.
