### Targeted Track → Social Issues
> **Note:** We've preserved the main demo for the live judging and hence you're advised to watch till [0:55](https://youtu.be/SBa7dVuS1Pc?t=55) of the YT video. Thanks!


## Inspiration 💡

One of the most significant challenges that all organizations face is the issue of unconscious bias in their hiring processes. Hiring managers may unconsciously allow their own beliefs and perceptions to influence their decisions in picking candidates. These biases, rooted in social conditioning and stereotypes, can act as a **barrier to hiring qualified diverse candidates**.
  
![image](https://user-images.githubusercontent.com/48355572/280545362-519e6ee0-ded6-4ad9-841c-5a81af341e50.png)
  
Unintentional biases in applications can lead to a lack of diversity, which is especially problematic in fields like healthcare, where a diverse workforce can provide better patient care due to a deeper understanding and relatability to the patient's experience.

To address this issue, we propose: the implementation of a blind recruitment strategy. It allows candidates to present themselves without the need to conceal their identities and enables companies to focus on the skills and qualifications that are directly relevant to the job.


![image](https://user-images.githubusercontent.com/48355572/280545149-f5fd7438-70e3-4e84-94d1-7e35d7db4e7c.png)
  

## What it does 🤔

DiverisifAI is a mobile app that allows job seekers to apply for jobs anonymously while emphasizing more in their talent. Applicants upload their resume and our platform uses GPT-4 to tweaks signs of identity—race, age, gender, religion, etc—in their application. Applicants can then edit this new resume and use it to apply to different roles. This equalizes the playing field for applicants, and allows recruiters make fair and unbiased hiring decisions. 

![image](https://user-images.githubusercontent.com/48355572/280540978-61815b60-6a4c-4e95-933b-eb09620322fa.png)

Our second feature is an interview preparation feature for applicants. It includes an interview bot that is knowledgeable about the job description and provides feedback and practice questions to help applicants prepare for interviews. This is particularly useful for professions such as healthcare, where interviews often include complex scenario-based questions based on ethics and medical situations. 

![image](https://user-images.githubusercontent.com/48355572/280541123-7f8f7bc7-f162-4b22-99e6-04c52df93d3a.png)



### Setting up Dev env

```bash
# On linux (you can use apt or apt-get depending on your distro)
yum -y install poppler-utils

# on mac
brew install xpdf
```

```bash
npm install
npx prisma db push
npm run dev
```



## UX Flow:
![image](https://user-images.githubusercontent.com/48355572/280545505-76d7cf84-be2a-4c2b-b124-90b3287b7e1d.png)
  
### Applicant Flow

1.  **User Onboarding:** Applicants initiate their journey by either signing in with their Google account or creating a new account on the platform.
    
2.  **Dashboard Access:** Once signed in, applicants are directed to the main dashboard which showcases job opportunities and relevant features of the app.
    
3.  **Job Application Submission:** Applicants can browse through job listings, using filters to narrow down their search based on their preferences and apply to positions by submitting their anonymized applications.
    
4.  **Interview Preparation:** The app offers an interview preparation tool that utilizes a knowledgeable bot providing feedback and practice questions tailored to the job description to help applicants refine their interview skills.
    
5.  **Messaging and Coordination:** Applicants have the ability to directly message potential employers and coordinate interviews or further communication.
    
6.  **Profile and Application Tracking:** Applicants can monitor their application status, view scheduled interviews, and receive updates through their personal profile page.
    
7.  **Feedback and Improvement:** Following interviews or interactions, applicants receive feedback which they can use to improve future applications or interview performance.
    

### Recruiter Flow

1.  **Job Creation:** Recruiters will have the capability to create new job listings, outlining the specifics and requirements for each position.
    
2.  **Applicant Review:** They can view anonymized applications, ensuring a focus on skills and qualifications without bias.
    
3.  **Communication with Applicants:** Recruiters can reach out to candidates through the app’s messaging system to schedule interviews or ask follow-up questions.
    
4.  **Interview Management:** There will be features for managing interview schedules, providing feedback, and tracking the progress of each applicant through the hiring process.
    
5.  **Analytics and Reporting:** Recruiters can access analytics to understand the diversity and skills landscape of the applicant pool and make informed decisions.
    

## How we built it ⚙️

First and foremost, it is Crafted with 💙. We have built a ML-enabled full-stack application that solves a real world problem. The whole process can be broken into the following points :-

  
* Front-end: TypeScript, Next.js with Tailwind CSS and DaisyUI

* Middleware & Backend: Express, Prisma Client, Firebase, Google Cloud API & MongoDB.

* ML Stack: PDF Parser, GPT-4

  
  ## Most Creative Use of GitHub 👩🏻‍💻

We used github to collaborate and create this project in multiple ways:

*  **Collaboration with Pull Requests and Issues:** We were a team of four members. Therefore, we created detailed **Pull Requests** to collaborate over this project. Moreover, all the bugs/features were dealt using **Issues**. We also requested **Reviews** on the PRs so that the changes could not break the product.

*  **Collaboration with Project:** Recently, we came accross Github Projects. For this hack, we utilized Github Projects to keep a track of each one's progress. We created different sections: ToDo, In Progress, Under Review, Finished and Video for the perfect team collaboration. You can check our Project [View 1 · DiversifAI (github.com)](https://github.com/users/Gaurang-1402/projects/4)

*  **Github Wiki:** We also used the Github Wiki to explain how to setup the project locally. You can check the wiki [Home · Gaurang-1402/DiversifAI Wiki (github.com)](https://github.com/Gaurang-1402/DiversifAI/wiki)


* **Github Workflows:** As a bonus, we also used Github workflows to assign labels to the PR to make the repository more readable.

*  **Github Templates:** The Pull Requests and Issues already have a template. Just try to raise an issue, you will be prompted to choose between two options: Feature/Bug. The templates are created using yaml file. Apart from that, we have also added MIT License and the ReadMe file.


![image](https://user-images.githubusercontent.com/48355572/280545560-0058341a-1123-4e01-a203-3eb3814de366.png)



## Design 🎨

We were heavily inspired by the revised version of **Double-Diamond** design process, which not only includes visual design, but a full-fledged research cycle in which you must discover and define your problem before tackling your solution & then finally deploy it.

  

![Double Diamond](https://user-images.githubusercontent.com/48355572/222963483-a7b27bd8-6223-4d6a-b56d-c3570ab5f92e.png)

  

> 1. **Discover**: a deep dive into the problem we are trying to solve.

> 2. **Define**: synthesizing the information from the discovery phase into a problem definition.

> 3. **Develop**: think up solutions to the problem.

> 4. **Deliver**: pick the best solution and build that.

  

We used Figma, Photoshop & Illustrator to prototype our designs before doing any coding. Through this, we are able to get iterative feedback so that we spend less time re-writing code.

  


![breaker](https://user-images.githubusercontent.com/48355572/214252830-b5c764db-25c2-451a-b74c-876423f81917.png)

 

## Research 📚

Below is a list of resources that we found insightful during our ideation phase:

Northwestern sociologists find discrimination in North America and Europe has changed very little, Feb 2023 (https://news.northwestern.edu/stories/2023/02/hiring-discrimination-the-problem-that-wont-go-away/)

Hiring managers pass over ‘names associated with Black people’ in their rush to review resumes, according to study of all 50 U.S. states, Sept 2023 (https://fortune.com/2023/09/24/affirmative-action-race-discrimination-hiring-black-sounding-names-study/)

This is a global issue - “Trends in racial and ethnic discrimination in hiring in six Western countries”, Dec 2022 (https://www.pnas.org/doi/epdf/10.1073/pnas.2212875120)

Nearly 20% of workers have changed their name on a resume because of discrimination concerns, says new report, Oct 2023 (https://www.cnbc.com/2023/10/19/nearly-20percent-of-job-candidates-have-changed-their-names-on-resumes-because-of-discrimination-concerns)

Who Discriminates in Hiring? A New Study Can Tell, July 2021 (https://www.nytimes.com/2021/07/29/business/economy/hiring-racial-discrimination.html)

- In-depth research into AI fairness and bias is crucial to ensure our algorithms promote equality. [AI Fairness and Bias](https://arxiv.org/pdf/2307.05842.pdf)

- It is important to acknowledge the potential for AI to inadvertently lead to unfair or discriminatory outcomes, and to actively work to prevent such issues. [AI and Discrimination](https://arxiv.org/ftp/arxiv/papers/2304/2304.07683.pdf)

Through our research, we discovered that even new AI technologies can contain biases depending on their training data. To mitigate this, we propose utilizing our AI as a neutralizing intermediary instead of having it act directly as a hirer.









- [Prisma ORM docs](https://www.prisma.io/docs)

  

  


**CREDITS**

- **Design Resources** : Freepik

- **Icons** : Icons8, fontawesome

- **Font** : Roboto / Orbitron / Raleway / Righteous

  
[![Group-1686550980.png](https://i.postimg.cc/0NBzJdNb/Group-1686550980.png)](https://postimg.cc/3y28sGmT)
---

 

## Challenges we ran into 😤

We faced some challenges during the hackathon, many of which ironically related to working remotely. One of the major challenges was the time difference. All of us participated from different time zones, which created communication challenges. 

We were also very ambitious and spent hours trying to implement Adobe PDF Extract API (as it can also give you the formatting/styles of the resume), but we didn't have enough time to implement access tokens and Adobe's in-house cloud uploading, so we turned to a simpler PDF parsing API.


## Accomplishments that we're proud of ✨

We are proud of finishing the project on time which seemed like a tough task as we started working on it quite late due to other commitments. We were also able to add most of the features that we envisioned for the app during ideation. And as always, working overnight was pretty fun! :)

  
This project was a notable accomplishment for us because it presented a unique experience compared to the typical hybrid hackathons. We engaged in thorough brainstorming and extensive research, which culminated in a satisfying sense of accomplishment upon successfully completing the project.

  

## What we learned 🙌

**Proper sleep is very important! :p** Well, a lot of things, both summed up in technical & non-technical sides. Also not to mention, we enhanced our googling and Stackoverflow searching skill during the hackathon :)

  

[![image-216.png](https://i.postimg.cc/KYRHNxmJ/image-216.png)](https://postimg.cc/VSPgsyrC)
  

Our four-person team is dedicated to fostering diversity and inclusivity in hiring processes through DiversifAI. We are committed to leveraging artificial intelligence to mitigate biases and enable equitable recruitment practices. Our mission extends beyond technology; it is about championing social justice and creating a more inclusive professional world. By providing tools that help companies expand their talent pool and embrace diversity, we contribute to building a fairer society. Our resolve to refine our algorithms and advocate for unbiased hiring is just the first step in our journey to make a lasting difference in the workplace and the wider community.

  
  

## What's next for DiversifAI🚀

The roadmap for DiversifAI includes scaling its platform to encompass a broader spectrum of industries, moving beyond the initial focus to ensure inclusivity across various sectors. The team is dedicated to enhancing the artificial intelligence algorithms to refine the anonymity features, ensuring an even more robust blind recruitment process that addresses nuanced aspects of bias.

Further development is also planned for the interview preparation tool, with the aim to include real-time interactive sessions using advanced natural language processing to simulate a wider range of interview scenarios. DiversifAI intends to forge partnerships with educational institutions and professional training programs to integrate these tools, aiding in the preparation of students and job seekers from diverse backgrounds.

Awareness campaigns and informational resources about the impact of bias in hiring and the benefits of a diverse workforce are on the agenda, aiming to drive the narrative forward for systemic change within the recruitment ecosystem.

In the long term, DiversifAI is set to pioneer a new standard in recruitment, where diversity is not just an aspiration but a fundamental aspect of every hiring strategy, embedded through technology and community efforts. The goal is to facilitate a job market where opportunities are accessible purely based on talent and potential, empowering both employers and candidates to thrive in a merit-based ecosystem.
  

#### License — [MIT](https://github.com/Gaurang-1402/DiversifAI/blob/main/LICENSE)

  

**Note ⚠️ — API credentials have been revoked. If you want to run the same on your local, use your own credentials.**

