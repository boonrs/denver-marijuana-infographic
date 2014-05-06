# Reference: https://github.com/davidensinger/davidensinger.github.io/blob/source/Rakefile
deployment_branch = "gh-pages"
no_build = "_site/.nojekyll"

desc "Clean deployment branch."
task :clean do
  puts "\n## Deleting deployment branch."
  exit_on_fail("git branch -D #{deployment_branch}")

  puts "\n## Creating new deployment branch and switching to it."
  exit_on_fail("git checkout -b #{deployment_branch}")
end

desc "Build _site/"
task :build do
  puts "\n## Build site."
  exit_on_fail("jekyll build")

  puts "\n## Add the no build flag for github."
  exit_on_fail("touch #{no_build}")
end

desc "Commit _site/"
task :commit do
  puts "\n## Staging modified files"
  exit_on_fail("git add -f _site/")

  exit_on_fail("git add #{no_build}")

  puts "\n## Committing a site build at #{Time.now.utc}"
  message = "Build site at #{Time.now.utc}"
  exit_on_fail("git commit -m \"#{message}\"")

  puts "\n## Forcing the _site subdirectory to be project root"
  exit_on_fail("git filter-branch --subdirectory-filter _site/ -f")

  puts "\n## Pushing commits to remote."
  exit_on_fail("git push -f origin #{deployment_branch}")
end

desc "Deploy to github pages."
task :deploy => [:clean, :build, :commit] do
end

def exit_on_fail(command)
  status = system(command)
  puts status ? "Success" : "Failed"
  if ! status
    raise "Aborting deployment, address issues listed above."
  end
end