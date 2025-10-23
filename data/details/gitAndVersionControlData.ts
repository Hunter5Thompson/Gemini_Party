// Fix: Populating placeholder file with actual data.
export const gitAndVersionControlData = {
  title: "Git & Version Control Explained",
  description: "Git is the industry standard for version control. It's an indispensable tool that allows you to track changes, collaborate with others, and manage your codebase effectively. Let's break down the core concepts.",
  learningPoints: [
    {
      title: "Master the Core Workflow",
      description: "The daily workflow in Git revolves around a few key commands that let you save your work and synchronize it with a remote repository.",
      examples: [
        {
          description: "1. Clone a repository: Get a local copy of a remote project.",
          code: "git clone https://github.com/example/project.git"
        },
        {
          description: "2. Add changes: Stage files you've modified to be included in the next snapshot (commit).",
          code: "git add . # Adds all changed files in the current directory"
        },
        {
          description: "3. Commit changes: Save your staged changes as a new snapshot in the project's history.",
          code: `git commit -m "feat: Implement user login functionality"`
        },
        {
          description: "4. Push changes: Upload your local commits to the remote repository (e.g., GitHub).",
          code: "git push origin main"
        },
        {
          description: "5. Pull changes: Download and merge changes from the remote repository to your local copy.",
          code: "git pull origin main"
        }
      ]
    },
    {
      title: "Branching & Merging Strategies",
      description: "Branches are a cornerstone of Git. They allow you to work on new features or bug fixes in an isolated environment without affecting the main codebase (often the `main` or `master` branch). A common strategy is 'Git Flow' or 'Feature Branching'.",
      examples: [
        {
          description: "1. Create a new branch: Start a new line of development for a specific feature.",
          code: "git checkout -b new-feature-branch"
        },
        {
          description: "2. Work on your feature: Make changes, add files, and commit your work on this branch.",
          code: `git add .
git commit -m "feat: Add user profile page"`
        },
        {
          description: "3. Switch back to the main branch: Once your feature is complete and tested.",
          code: "git checkout main"
        },
        {
          description: "4. Merge your feature branch: Integrate the changes from your feature branch into the main branch.",
          code: "git merge new-feature-branch"
        }
      ]
    },
    {
      title: "Practice Resolving Merge Conflicts",
      description: "A merge conflict occurs when Git is unable to automatically resolve differences in code between two commits. This happens when the same lines are changed in different branches. You must resolve these manually.",
      examples: [
        {
          description: "1. Git will mark the conflict in the file. Your job is to edit the file to fix the conflicting section.",
          code: `<<<<<<< HEAD
This is the content from your current branch.
=======
This is the content from the branch you are merging.
>>>>>>> feature-branch-name`
        },
        {
          description: "2. After editing the file to keep the code you want, you must stage the resolved file.",
          code: "git add conflicted-file.js"
        },
        {
          description: "3. Finally, complete the merge by creating a commit.",
          code: `git commit -m "fix: Resolve merge conflict in conflicted-file.js"`
        }
      ]
    },
    {
      title: "Use Platforms like GitHub or GitLab",
      description: "These platforms provide hosting for your Git repositories and add powerful features for collaboration, such as Pull Requests (or Merge Requests).",
      examples: [
        {
          description: "1. Fork a repository: Create your own server-side copy of a project on GitHub.",
          code: "# This is done via the GitHub UI."
        },
        {
          description: "2. Create a Pull Request (PR): After pushing your feature branch to your fork, you can open a PR. This is a formal request to merge your changes into the original project.",
          code: "# This is also done via the GitHub UI."
        },
        {
          description: "3. Code Review: Teammates can now review your code, leave comments, and suggest changes before it's merged. This process is crucial for maintaining code quality.",
          code: "# Collaboration happens on the Pull Request page on GitHub/GitLab."
        }
      ]
    }
  ],
  interactiveTool: {
    title: "AI Commit Message Generator",
    description: "Struggling with writing clear and conventional commit messages? Describe your changes below and let AI generate a message for you."
  }
};