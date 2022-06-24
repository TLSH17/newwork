# Git

> git 

> git config --global core.editor "nano"

> git config --global user.name "Alex Ng"

> git config --global user.email "alex.ng19941008@gmail.com

> git status
    
    To Check the status of git is it upload or ready or not

>git init

    to set up to git file in directory

>git clone git@............ 

    (copy from github project ssh) clone in the directory

>git pull original master

    pull all the file to local

>git add.

    to update the file to local git

>git commit -m "remark"

    to ready for submit to online github

>git push

    upload to online github

###Tommy
create a new repository on the command line
------
echo "# Notes" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:TLSH17/Notes.git
git push -u origin main

---
or push an existing repository from the command line
--
git remote add origin git@github.com:TLSH17/Notes.git
git branch -M main
git push -u origin main
--




# Workflow in Git

You have already learned a lot of git-related commands. A typical workflow with Git will be as follow:

1. Run command git pull origin master to get the latest change
2. Edit your files and save the changes
3. Run command git add . to stage them.
4. Run command git commit -m "Commit message" to commit the changes
5. Run command git pull origin master to see if there are additional changes during the edit.
6. Run command git push origin master to push to remote repository.


## Nano Commands

If after enter git pull, show the commands message, it is shown because there is a merge happening. What you need to do is to save the merge message.

> ctrl + o

> Enter

> ctrl + x

After the 3 commands above, will pull the update from github.