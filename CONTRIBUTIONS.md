🏀 Contributions Guide - Practice Film Analytics

Welcome to the codebase for our basketball practice film analytics platform. This guide outlines how we work with Git branches, push code, and collaborate using pull requests.

⸻

📁 Repository Structure
	•	main — Stable production branch (deployed to AWS)
	•	dev — Active development branch; integrates completed features
	•	feature/xyz — Temporary branch for individual features or fixes

⸻

🚀 Workflow for Contributors
1.	Start from the latest dev

```
git checkout dev
git pull origin dev
git checkout -b feature/your-feature-name
```

2.	Commit and push regularly while working

```
git add .
git commit -m "Short but descriptive message"
git push origin feature/your-feature-name
```

3.	Open a Pull Request (PR) into dev
	•	Go to GitHub > Pull Requests > New PR
	•	Base branch: dev
	•	Compare: feature/your-feature-name
	•	Add a clear title and description
4.	Get your PR reviewed
	•	Tag @project-lead or teammates for code review
	•	Address any comments or requested changes
5.	Merge and clean up
	•	Once approved, merge into dev (use “Squash and merge” if appropriate)
	•	Delete your feature branch on GitHub

⸻

🔁 Keeping Your Feature Branch Up to Date

If dev has changed while you’re working:
```
git checkout feature/your-feature-name
git fetch origin
git merge origin/dev
```
Resolve conflicts if needed, then recommit and push.

⸻

✅ Pull Request Template (Optional)

You can copy this into your PR description:

## Summary
Brief explanation of the change.

## Checklist
- [ ] Feature complete
- [ ] Tested locally
- [ ] Reviewed by a teammate


⸻

🔒 Branch Protection Rules

We use GitHub branch protection for:
	•	main and dev: direct pushes are restricted
	•	All changes must go through PRs
	•	Reviews are required for merging

⸻

📌 Notes
	•	Use clear, consistent commit messages.
	•	Always branch off the latest dev, not main.
	•	Push early and often. PRs don’t have to be perfect at first — collaboration is the goal.

⸻

For any questions, reach out to @project-lead or open an issue in the repo.

Let’s build a clean, maintainable, and powerful analytics tool for our basketball team!
