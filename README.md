Denver Marijuana Data Visualization
============================

## Overview
A simple visual overview of Denver marijuana data. Based off of the [Denver Data Visualization Template][template].

[template]: https://github.com/codeforamerica/denver-data-visualization-template

## Prerequisite
1. Ruby 2.1.1
1. Bundler In the command line: `gem install bundler`

## Installation, Usage
* **Downlad dependencies** In the command line: `bundle`

### Local Development
1. Jekyll compiles everything into a static site in the _site folder. In order to get the latest changes and start the server, use the following command: `jekyll serve --watch`
1. Navigate to [localhost:4000][local] to preview the site. Most changes will update immediately. The exception is changes to *_config.yml*. The server will need to be restarted in that case.

[local]: http://localhost:4000	

### Deployment
1. Compile the site: `jekyll build`
1. Deploy contents of */_site* to server.

## ETL Scripts
[Rake][] tasks exist for each section of the data visualization. These tasks query the open data portal and update the csv files located in /data with the latest data. These can be set to run on a schedule through task scheduler (windows), a cron job (others), or heroku scheduler (heroku). Errors output to the console.
* List all tasks: `rake -T`
* Run all tasks: `rake`

[rake]: https://github.com/jimweirich/rake


## Submitting an Issue
We use the GitHub issue tracker to track bugs and features. Before submitting a bug report or feature request, check to make sure it hasn't already been submitted. When submitting a bug report, please include a [Gist][] that includes a stack trace and any details that may be necessary to reproduce the bug.

[gist]: https://gist.github.com/

## Submitting a Pull Request
1. [Fork the repository.][fork]
2. [Create a topic branch.][branch]
3. [Submit a pull request.][pr]

[fork]: http://help.github.com/fork-a-repo/
[branch]: http://learn.github.com/p/branching.html
[pr]: http://help.github.com/send-pull-requests/

# License
See the [LICENSE][] for details.

[license]: https://github.com/boonrs/denver-marijuana-infographic/blob/master/LICENSE
