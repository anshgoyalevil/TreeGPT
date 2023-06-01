# TreeGPT
A GitHub File Tree Generator for GPT-3 and 4 Model

Quickly generate File Trees for any GitHub Project and feed them to ChatGPT for understanding that project.

**You would need ```Personal GitHub Token``` for this to work**. It is available for FREE. Steps to generate access token are below.

## How to install TreeGPT?

You would need [Node.JS](https://nodejs.org/en) installed into your local machine for this to install.

- Run the command:

  ```
  npm install -g treegpt
  ```

## How to generate ```GitHub token```?

1. Go to [GitHub Developer Settings](https://github.com/settings/tokens)
2. Click ```Generate new token``` in the navigation pane.
3. Click ```Generate new token (Classic)```
4. In ```Note``` field, give any descriptive name as per your choice. For example: Key for TreeGPT
5. Set ```Expiration``` to ```No Expiration``` or as per your choice.
6. In the ```Select Scopes``` panel, Tick ```repo``` scope.

   ![image](https://github.com/anshgoyalevil/TreeGPT/assets/94157520/5b49dc4f-114e-4872-8d03-bd42f683cf3c)
7. Finally Click ```Generate Token``` button.
8. Copy this token and save it to a secured place. You would need it everytime you generate a File Tree For Different Projects.

**Note: Never share GitHub Token with anyone else.**

## How to generate file tree?

1. Open any folder where you want to generate the file tree.
2. Run ```treegpt``` command in your git bash or VSCode Terminal.
3. It would then ask you for ```GitHub Token```. Enter the newly generated token here, and press enter.
4. Now, enter the ```GitHub Author```, which is your GitHub username, and press enter. (Note: You cannot use someone else's username here. GitHub Token is restricted to your own account only.
5. Enter the project name for which you want the tree to be generated and press enter.
6. Enter the maximum depth and press enter. For example, 3 would generate a file structure of maximum children depth 3. Set it to a higehr number like 9999 if you are unsure about this.
7. Your tree would get generated as a ```.txt``` file.

## How to generate a file-tree for someone else's project?

Fork that project to your own GitHub account. It is that simple. :)

## Contributions

This project is open to contributions. Please read contributions guidelines and procedure for more details.
