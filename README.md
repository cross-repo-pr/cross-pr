# Many 2 Monorepo
Guidelines and commands for adding many repos to a monorepo (by reference)

### 1. Create the project
First, create an empty monorepo project in git. I am using cross-repo-pr/monorepo for the examples below.

```
git clone git@github.com:cross-repo-pr/monorepo.git
cd monorepo
```

### 2. Add subtrees for all your projects
Every repository that you want to include in the monorepo will be added as a folder.

```
git remote add managed git@github.com:cross-repo-pr/managed.git
git subtree add --prefix=managed/ managed master
```

This first adds the external remote for the repository you would like to add and then creates a sub-folder named managed,
checking out the master branch from within.

You may repeat this for however many repositories you would like to add.

### 3. Making a change in the Monorepo
Here we go through the workflow of making a change in the monorepo and propogating it to the sub-repos.

1. Make a change in any of the folders contained within the monorepo
2. Commit your changes to the monorepo
    ```
    git add managed/deps.txt
    git commit -m "Updated dependencies"
    ```
3. Split the monorepo tree for the specified sub-repo
    ```
    ./splitsh-lite -prefix managed/
    ```
4. Push the monorepo changes up
    ```
    git push upstream master
    ```
5. Push the individual repo's changes up
    ```
    git subtree push --prefix=managed/ managed master
    ```

### 4. Updating your local monorepo
Updating your local instance of all the repos from within the monorepo itself is as easy as updating the monorepo itself.

```
cd monorepo
git pull upstream master
```

#### 4.a. Updating the monorepo when another repo changed independently
This use case is when someone pushes a commit to the repository itself (not the monorepo).

To update the repo's folder inside of the monorepo, we can use the following:
```
cd monorepo
git subtree pull --prefix=core/ core master
```

This will create a merge commit on the monorepo project which you can push up.
```
git push upstream master
```

If there were any merge conflicts, you will need to push that conflict resolution commit to the sub-projects themselves with:
```
git subtree push --prefix=core/ core master
```

### 5. Updating your local many-repos
If someone has the individual repos checked out, they may just normally pull from the remote to obtain the latest changes.

This also requires the user to navigate into each project directory and pull all the updates individually. However, if you only want to see a subset of code, pulling down just one project may be better.

```
cd managed
git pull origin master

cd fuse
git pull origin master

cd core
git pull origin master
```

_The above commands are expected to be executed from outside the context of the monorepo._