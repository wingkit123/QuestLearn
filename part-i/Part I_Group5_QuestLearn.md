

Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 1

## Software Requirements
## Specification
for
QuestLearn   (Smart   Interactive
## Learning System)
## Version <1.0>




Group No.: <Group 5>
<See Wing Kit> <261UC240PJ>
<Aziel Tan Zheng Chuan> <261UC240LY>
<Vincent Lock Chun Kit> <261UC2406W>
<Soo Kian Rong> <261UC26145>





## Date: <28 April 2025>

Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 2


## Contents
Table of Contents
1 PROJECT INTRODUCTION ......................................................................................................................... 4
1.1 TEAM MEMBERS ........................................................................................................................................ 4
1.2 PROBLEM STATEMENT ................................................................................................................................ 4
1.3 PROJECT SCHEDULE ................................................................................................................................... 5
2 SYSTEM OVERVIEW .................................................................................................................................... 6
2.1 DESCRIPTION .............................................................................................................................................. 6
2.2 ACTORS ...................................................................................................................................................... 7
2.3 ASSUMPTIONS AND DEPENDENCIES ........................................................................................................... 8
2.4 USE CASE DIAGRAM .................................................................................................................................. 9
3 FUNCTIONAL REQUIREMENTS .............................................................................................................. 10
3.1 ACTOR 1-STUDENT .................................................................................................................................. 10
3.1.1 Use Case 1-Register Account and Verify Email ................................................................................. 10
3.1.2 Use Case 2-Start Lesson ..................................................................................................................... 12
3.1.3 Use Case 3-Attempt Quiz and Receive Automated Feedback ............................................................. 14
3.1.4 Use Case 4-Submit Assignment .......................................................................................................... 16
3.2 ACTOR 2-INSTRUCTOR ............................................................................................................................. 18
3.2.1 Use Case 5-Create Course and Learning Structure ........................................................................... 18
3.2.2 Use Case 6-Publish Lesson Content and Interactive Material ........................................................... 20
3.2.3 Use Case 7-Create Assessment and Configure Feedback .................................................................. 22
3.3 ACTOR 3-ACADEMIC ADVISOR ................................................................................................................ 24
3.3.1 Use Case 8-View Advisor Alert Dashboard and Follow Up............................................................... 24
3.4 ACTOR 4-ADMIN ...................................................................................................................................... 26
3.4.1 Use Case 9-Moderate Content and Manage Announcements ............................................................. 26
4 SYSTEM MODELS ........................................................................................................................................ 28
4.1 ERD DIAGRAM ........................................................................................................................................ 28
4.2 ENTITIES .................................................................................................................................................. 28
5 NON-FUNCTIONAL REQUIREMENTS .................................................................................................... 34
6 REFERENCES ................................................................................................................................................ 35













Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 3


## Revisions
Version Primary Author(s) Description of Version Date Completed
SRS in Part
## 1(as Ver
## 1.0)
SDS in Part
## 2(as Ver
## 2.0.X)
*System
## Documenta
tion  in  Part
## 3   (as   Ver
## 3.0)
## Draft  Type
and
## Number
## See  Wing  Kit,  Aziel
## Tan   Zheng   Chuan,
## Vincent   Lock   Chun
## Kit, Soo Kian Rong
Initial  Part  I  SRS  draft  for  QuestLearn  based  on
the   TT7L   Smart   Interactive   Learning   System
brief.
## 27/04/2026
SDS in Part
## 2(as Ver
## 2.0.X)

## System
## Documenta
tion  in  Part
## 3   (as   Ver
## 3.0)





Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 4


## 1 Project Introduction
QuestLearn is a Smart Interactive Learning System proposed for higher education. The system is
designed  to  improve  student  engagement  and  academic  support  by  combining  microlearning-
based lesson delivery,  embedded video and reading content, quiz and assignment management,
automated  feedback,  activity  tracking,  progress  analytics,  and  academic  advisor  monitoring
support.

The  project  addresses  a  common  limitation  in  existing  learning  platforms:  many  systems  can
store  notes,  videos,  and  quizzes,  but  they  do  not  actively  guide  students  through  short  learning
paths, identify weak topics quickly, or help  academic staff intervene early when students show
signs  of  academic  risk.  QuestLearn  is  intended  to  provide  a  more  complete  and  connected
workflow for students, instructors, academic advisors, and administrators.
## 1.1 Team Members

Name Actor/Processes
See Wing Kit Project   Leader: Overall   scope   control,   system
integration, requirements alignment, final review
Aziel Tan Zheng Chuan Programming Leader: ERD and class logic support,
technical structure, data relationship validation
Vincent Lock Chun Kit Documentation Manager: System overview writing,
use  case  formatting,  process-flow  and  Gantt  chart
preparation
Soo Kian Rong Quality Manager: Requirements coverage checking,
consistency review, proofreading and quality audit


1.2 Problem statement
Current  university  learning  systems  are  often  useful  for  content  storage  and  basic  assessment
delivery,  but  they  are  less  effective  at  actively  supporting  students  throughout  the  learning
process.  Students  may  access  lecture  materials  and  attempt  quizzes,  yet  still  receive  limited
guidance  on  what  to  study  next,  why  they  performed  poorly,  or  how  to  improve  weak  areas
through targeted remedial learning.

These   platforms   also   tend   to   separate   course   content,   progress   monitoring,   assessment
performance,   and   academic   support   into   disconnected   functions.   Instructors   may   upload

Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 5

materials  without  seeing  rich  engagement  signals,  students  may  complete  activities  without
meaningful  personalized  feedback,  and  academic  advisors  may  only  detect  problems  after
academic  results  have  already  declined.  As  a  result,  universities  miss  opportunities  for  timely
intervention and sustained learner motivation.

QuestLearn  is  proposed  to  solve  this  problem  by  combining  guided  microlearning,  embedded
video  and  reading  content,  assignment  management,  activity  tracking,  automated  feedback,
weak-topic identification, and advisor student monitoring in one integrated platform.

## 1.3 Project Schedule

Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 6


## 2 System Overview
## 2.1 Description
QuestLearn  is  designed  as  a  higher-education  learning  platform  that  supports  four  main
roles: Student, Instructor, Academic  Advisor, and Admin.  Its  main  purpose  is  to  provide  a
more  engaging  and  supportive  learning  experience  than  a  traditional  content  repository  by
connecting  learning  delivery,  assessment,  progress  monitoring,  and  academic  intervention  into
one coherent workflow.

The system includes the following major functions:

## 1. User Management
- account registration and login with email and password
- admin-mediated password reset for users who forget their credentials
- role-based access control
- profile management for students, instructors, academic advisors, and admins
- student  profile  storage  including  academic  level,  programme  or  department,  and  learning
preferences
- instructor profile storage including specialization, subjects taught, and office hours
- activity tracking for quizzes taken, videos watched, pages visited, and lesson interactions

- Course and Content Management
- course creation and editing
- module and lesson management
- lesson sequencing into guided microlearning paths
- integration of videos, reading materials, and H5P content authored through Lumi
- content publishing workflow for lessons and modules
- learning content moderation and platform oversight by admins

- Assessment and Progress Tracking
- quiz and assignment management
- question bank support and randomized question selection
- support  for  multiple  question  types  such  as  multiple  choice,  fill-in-the-blank,  and  short
answer
- auto-grading for objective question types
- attempt history, score storage, submission tracking, and assessment history
- module completion status, learning progress, and detailed performance analytics
- automated feedback for quiz attempts with tips for improvement based on mistakes
- weak-topic identification and recommended next steps



Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 7

- Reporting and Notifications
- student  dashboard  with  progress,  grades,  assessment  history,  and  recommended  next
steps
- instructor dashboard with class performance and course engagement analytics
- academic  advisor  dashboard  with  assigned  students,  progress  summaries,  and  risk
indicators
- admin dashboard for user management, moderation, announcements, and  platform-wide
oversight
- notifications   for   assignment   deadlines,   new   course   content   uploads,   quiz   score
announcements, and advisor support alerts

The  system  also  introduces  several  innovation  points  within  a  realistic  prototype  scope.  These
include automated quiz feedback with weak-topic identification and recommended next steps, an
academic  advisor  monitoring  dashboard  with  student  progress  summaries  and  performance
indicators, and in-app notification delivery for key academic events.

## 2.2 Actors

## Actor Use Cases
Student Register  account,  log  in,  manage  profile,  view  enrolled  courses,  start
lesson,   attempt   quiz,   submit   assignment,   view   progress,   view
recommended next steps, receive notifications
Instructor Register  account,  log  in,  manage  instructor  profile,  create  course,
create  module,  create  lesson,  upload  learning  content,  create  quiz,
create  assignment,  configure  automated  feedback,  publish  learning
content, view analytics, send course announcements
Academic Advisor Log   in,   view   department   students,   review   student   progress   and
performance, send advisory follow-up
Admin Log  in, manage  users,  assign  roles,  approve  instructor  accounts,  reset
user  password,  moderate  learning  content,  manage  announcements,
view platform analytics

Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 8

2.3 Assumptions and Dependencies
The following assumptions and dependencies are used as the basis for the current SRS.

- The  system  is  intended  for  university-level  teaching  and  learning  rather  than  general  public  self-
learning.
- Users  will  access  the  platform  through  a  stable  web  connection  on  standard  desktop  or  mobile
browsers.
- User  registration  uses  email  and  password  without  external  email  verification  services.  Account
activation is immediate upon successful registration.
- If a user forgets their password, the Admin can reset it to a temporary default value. No self-service
password recovery is included in the initial scope.
- Video content is embedded within lessons using external URLs such as YouTube. No custom video
hosting or interactive authoring engine is included in the initial scope.
- Academic  advisor  monitoring  is  based  on  visible  quiz,  assignment,  and  progress  data  rather  than
automated predictive risk models.
- In-app  notifications  for  deadlines,  uploaded  content,  and  quiz  score  announcements  depend  on
correct event triggering and user account data.
- The   first   version   of   the   system   will   focus   on   core   academic   workflows   only.   Advanced
gamification, social features, mobile-native apps, and enterprise integration are outside initial scope.


Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 9

## 2.4 Use Case Diagram


Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 10


## 3 Functional Requirements
3.1 Actor 1-Student
3.1.1 Use Case 1-Register Account and Verify Email
This use case enables a new student to create an account and log in to access the platform.

## Use Case Name
Register Account and Login
## Actors
## Student, Instructor, Academic Advisor
## Preconditions
The user   does   not   already   have   an   active
account.
## Normal Flow Description
- The user opens the registration page.
- The user enters required account
information     including     name,     email,
student/staff ID, password, and
programme/department.
- The system validates the submitted data.
- The   system   creates   the   account   and
assigns the appropriate role.
- The user is redirected to the login page.
- The user enters credentials and logs in.
- The system opens the user dashboard.
## Postconditions
The  user  account  is  created  and  the  user  is
logged   in   with   access   to   their   dashboard.
(Note: Instructors may require admin approval
before    full    course    creation    features    are
unlocked).
Alternative flows and exceptions
If  the  email  is  already  registered,  the  system
shows an error and directs the user to log in. If
login credentials are invalid, the system allows
retry. After 3 failed login attempts, the account
is locked for 15 minutes. If a user forgets their
password, they contact the Admin who resets it
to  a  temporary  default  value.  The  user  must
change their password upon next login.
Non functional requirements
Account creation should be simple, secure, and
complete  within  a  short  response  time.  Login
events must be recorded reliably.

Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 11



Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 12


3.1.2 Use Case 2-Start Lesson
This use case enables a student to access a course lesson and begin guided learning activities.

## Use Case Name
## Start Lesson
## Actors
## Student

## Preconditions
The  student  is  logged  in  and  enrolled  in  the
selected course.
## Normal Flow Description
- The student opens a course.
- The student selects a module.
- The student selects a lesson.
- The   system   displays   lesson   content,
including   reading   material,   embedded
video, and H5P activity where available.
- The  system  records  page  visits,  video
interactions,  and  lesson  access  in  the
activity log.
- The   system   updates   lesson   progress
status.


## Postconditions
Lesson   access   and   progress   updates   are
stored for analytics and progress tracking

Alternative flows and exceptions
If  the  lesson  is  unpublished  or  unavailable,
the system informs the student that access is
not currently available.

Non functional requirements
Lesson   content   should   load   clearly   and
consistently.   Activity   tracking   should   be
accurate  and  should  not  noticeably  interrupt
the user experience.

Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 13



Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 14


3.1.3 Use Case 3-Attempt Quiz and Receive Automated Feedback
This use case enables a student to attempt a quiz and receive immediate automated feedback.

## Use Case Name
Attempt     Quiz     and     Receive     Automated
## Feedback
## Actors
## Student

## Preconditions
The  student  is  logged  in  and  the  selected  quiz
is available.

## Normal Flow Description
- The student starts the quiz.
- The    system    displays    quiz    questions,
including randomized items if configured.
- The student submits answers.
- The system auto-grades objective question
types.
- The   system   stores   the   attempt   score,
answer details, and activity record.
- The  system  displays  automated  feedback,
identifies     weak     topics,     and     shows
recommended next steps.

## Postconditions
The    quiz    attempt    result    is    saved    for
performance analysis, recommendation
generation, and dashboard reporting.

Alternative flows and exceptions
If subjective questions exist, the system stores
those  answers  for  later  review  while  objective
items    are    graded    automatically.    If    the
submission  is  incomplete,  the  system  warns
the student before final submission.

Non functional requirements
Feedback  should  be  generated  quickly,  quiz
records  should  be  reliable,  and  grading  for
objective items should be consistent.

Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 15



Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 16


3.1.4 Use Case 4-Submit Assignment
This use case enables a student to submit assignment work before a deadline.

## Use Case Name
## Submit Assignment
## Actors
## Student

## Preconditions
The   student   is   logged   in,   enrolled   in   the
course,   and   the   assignment   is   open   for
submission unless late submission is allowed.

## Normal Flow Description
- The  student  opens  the  assignment  details
page.
- The system displays assignment
instructions,    deadline,    and    submission
rules.
- The    student    uploads    or    submits    the
required work.
- The system validates the submission.
- The  system  records  the  submission  time
and status.
- The system confirms successful
assignment submission.


## Postconditions
The   assignment   submission   is   stored   for
instructor review and student history.

Alternative flows and exceptions
If the file format or submission data is invalid,
the system rejects the submission and requests
correction.   If   the   deadline   has   passed,   the
system  either  blocks  the  submission  or  marks
it as late according to system rules.

Non functional requirements
Submission  handling  should  be  dependable,
and  confirmation  feedback  should  be  clear  to
the student.

Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 17



Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 18


3.2 Actor 2-Instructor
3.2.1 Use Case 5-Create Course and Learning Structure
This use case enables an instructor to create a course with modules and lessons.

## Use Case Name
Create Course and Learning Structure
## Actors
## Instructor

## Preconditions
The instructor account is active upon approved
and logged in to the account.

## Normal Flow Description
- The   instructor   opens   the   create   course
page.
- The instructor enters course details such as
title, code, department, and description.
- The system creates the course record.
- The instructor adds modules to the course.
- The    instructor    adds    lessons    to    each
module.
- The  system  stores  the  learning  structure
for  later  content  publishing  and  student
access.


## Postconditions
The  course  structure  is  available  for  content,
quiz, and assignment setup.

Alternative flows and exceptions
If   required   course   details   are   missing,   the
system requests correction before saving.

Non functional requirements
Course  setup  should  be  easy  to  follow  and
should  preserve  data  correctly  across  editing
sessions.

Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 19



Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 20


3.2.2 Use Case 6-Publish Lesson Content and Interactive Material
This use case enables an instructor to upload or embed lesson content and publish it to students.

## Use Case Name
Publish    Lesson    Content    and    Interactive
## Material
## Actors
## Instructor

## Preconditions
The  instructor is logged  in with a course,
module, and lesson already exist.
## Normal Flow Description
- The instructor selects a lesson.
- The  instructor  uploads  or  links  reading
material,  video  content,  and  H5P  content
authored through Lumi.
- The instructor saves lesson content.
- The instructor publishes the lesson.
- The  system  makes  the  lesson  available  to
enrolled students.
- The system records content publication for
notification and analytics purposes.


## Postconditions
Students  can  access  the  published  lesson,  and
the system can notify affected users.
Alternative flows and exceptions
If uploaded or embedded content is invalid, the
system    rejects    the    content    and    requests
correction.
Non functional requirements
Content   publishing   should   be   reliable,   and
embedded  resources  should  remain  accessible
after publication.

Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 21



Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 22


3.2.3 Use Case 7-Create Assessment and Configure Feedback
This use case enables an instructor to create a quiz or assignment and define grading settings.

## Use Case Name
Create Assessment and Configure Feedback
## Actors
## Instructor

## Preconditions
The  instructor is logged in with an  active
course and a valid lesson or assignment target.

## Normal Flow Description
- The     instructor     creates     a     quiz     or
assignment.  The  instructor  defines  rules
such   as   question   type,   deadline,   total
marks, and marking configuration.
- The  instructor  selects  or  creates  question
bank items for quizzes.
- The     instructor     configures     automated
feedback for objective questions.
- The instructor publishes the assessment.
- The   system   stores   the   assessment   and
makes   it   available   according   to   course
rules.


## Postconditions
The    assessment    is    available    for    student
completion and later analytics.

Alternative flows and exceptions
If   assessment   settings   are   incomplete,   the
system  blocks  publishing  until  required  fields
are completed.

Non functional requirements
Assessment  data  should  be  stored  accurately,
and published settings should remain
consistent across student attempts.

Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 23



Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 24


3.3 Actor 3-Academic Advisor
3.3.1 Use Case 8-View Advisor Alert Dashboard and Follow Up
This use case enables an academic advisor to identify at-risk students and perform follow-up

## Use Case Name
View Advisor Alert Dashboard and Follow Up
## Actors
## Academic Advisor

## Preconditions
The  academic  advisor  is  logged  in  and  has
assigned students.
## Normal Flow Description
- The advisor opens the dashboard.
- The   system   displays   assigned   students,
risk   levels,   overdue   work,   and   low-
engagement indicators.
- The advisor selects a student.
- The system displays progress history, quiz
performance,   overdue   assignments,   and
alert reasons.
- The advisor reviews recommended
intervention suggestions.
- The  advisor  sends  a  follow-up  advisory
message.
- The system records the follow-up status.


## Postconditions
The    advisor    has    current    information    for
intervention,   and   the   follow-up   action   is
recorded.

Alternative flows and exceptions
If no current alerts exist, the system still allows
the    advisor    to    review    assigned    student
summaries.

Non functional requirements
Alert  information  should  be  timely,  easy  to
interpret, and protected according to
appropriate access control rules.


Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 25


Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 26


3.4 Actor 4-Admin
3.4.1 Use Case 9-Moderate Content and Manage Announcements
This use case enables an admin to manage oversight, moderation, and announcement activities.

## Use Case Name
Moderate Content and Manage
## Announcements
## Actors
## Admin
## Preconditions
The admin is logged in.

## Normal Flow Description
- The  admin  reviews  flagged  or  managed
platform content.
- The  admin  approves,  updates,  or  removes
content where necessary.
- The  admin  creates  or  updates  a  system  or
course-related announcement template.
- The  system  distributes  announcements  or
stores them for notification delivery.
- The   system   records   the   moderation   or
announcement action for oversight
purposes.


## Postconditions
Moderation   and   announcement   actions   are
stored   and   can   affect   user   notifications   or
content availability.
Alternative flows and exceptions
If    content    does    not    require    moderation
changes,  the  admin  closes  the  review  without
modification.

Non functional requirements
Administrative  functions  must  be  restricted  to
authorized  users  and  should  maintain  a  clear
audit trail.

Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 27



Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 28


## 4 System Models
4.1 ERD Diagram

## 4.2 Entities
## Entity / Attribute Description
Role Defines the access levels and permissions
assigned to users in the system.
role_id (Primary Key) Unique identifier for each specific role.
role_name The descriptive name of the role.

Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 29


## Entity / Attribute Description
User Stores login and identity information for all
platform users.
user_id (Primary Key) Unique identifier for the user.
role_id (FK) Unique identifier for the assigned role.
full_name The user's full name for display and records.
email Contact and login email address.
password_hash Secure hashed password used for authentication.
status Account state (e.g., active, suspended, closed).
email_verified_at Timestamp when the user's email was verified.
created_at Time the account was created.

## Entity / Attribute Description
InstructorProfile Stores professional details specifically for users
with teaching roles.
instructor_profile_id (PK) Unique identifier for the instructor's profile.
user_id (FK) Links the profile to a specific record in the User
table.
specialization The primary area of expertise or academic focus
of the instructor.
subjects_taught A record of the specific topics or courses the
instructor is responsible for.
office_hours The designated times the instructor is available
for student consultations.

## Entity / Attribute Description
StudentProfile Stores academic and learning preference details
for student users.
student_profile_id (PK) Unique identifier for the student's profile.
user_id (FK) Links the profile to a specific record in the User
table.
academic_level The student's current level of study (e.g.,
## Diploma, Degree).
programme The specific academic program the student is
enrolled in.
department The academic department the student belongs to.
learning_preference The student's preferred learning style or settings.

## Entity / Attribute Description
AdvisorProfile Stores professional details for academic advisors.
advisor_profile_id (PK) Unique identifier for the advisor's profile.
user_id (FK) Links the profile to a specific record in the User
table.
department The academic department the advisor belongs to.
office_hours The designated times the advisor is available for

Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 30

consultations.

## Entity / Attribute Description
AdvisorStudentAssignment Maps students to their designated academic
advisors.
advisor_student_assignment_id (PK) Unique identifier for the assignment record.
advisor_profile_id (FK) Identifies the assigned advisor.
student_profile_id (FK) Identifies the assigned student.
assigned_at Timestamp of when the assignment was made.
status The current status of the assignment (e.g.,
## Active).

## Entity / Attribute Description
Course Represents an academic subject or unit of study
offered on the platform.
course_id (PK) Unique identifier for the course.
instructor_profile_id (FK) Identifies which instructor is managing or
teaching the course.
title The official name of the course.
code The alphanumeric identifier used for course
registration.
description A brief summary of the course objectives and
content.
department The academic department or faculty the course
belongs to.
status The current state of the course, such as Active or
## Archived.

## Entity / Attribute Description
Module Represents a structural unit, section, or chapter
within a course.
module_id (PK) Unique identifier for the module.
course_id (FK) Identifies the course this module belongs to.
title The name of the module.
description A brief overview of the module's content.
sequence_no The logical ordering of the module within the
course.

## Entity / Attribute Description
Lesson A specific instructional session or topic contained
within a module.
lesson_id (PK) Unique identifier for the lesson.
module_id (FK) Identifies the module this lesson belongs to.
title The name of the lesson.
lesson_type The format or style of the lesson.

Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 31

content_summary A short summary of what is covered in the
lesson.
sequence_no The logical ordering of the lesson within the
module.
publish_status Whether the lesson is published and visible to
students.

## Entity / Attribute Description
ContentItem Multimedia or textual resources attached to a
specific lesson.
content_item_id (PK) Unique identifier for the content item.
lesson_id (FK) Identifies the lesson this content belongs to.
content_type The format of the content (e.g., video, PDF, text).
title The name or heading of the content piece.
source_tool The external or internal tool used to generate/host
the content.

## Entity / Attribute Description
Quiz An assessment element tied to a lesson to
evaluate student understanding.
quiz_id (PK) Unique identifier for the quiz.
lesson_id (FK) Identifies the lesson this quiz is associated with.
title The name of the quiz.
total_marks The maximum score achievable on the quiz.
randomized_flag Indicates if the questions are shown in a random
order.
publish_status Whether the quiz is active and visible to students.

## Entity / Attribute Description
QuizAttempt Records a student's completion of a quiz and their
resulting score.
attempt_id (PK) Unique identifier for the quiz attempt.
quiz_id (FK) Identifies the quiz that was attempted.
student_profile_id (FK) Identifies the student who took the quiz.
score float The numerical grade achieved in the attempt.
submitted_at Timestamp of when the quiz was completed and
submitted.
feedback_summary Overall feedback provided based on the student's
performance.

## Entity / Attribute Description
Assignment A task or project assigned within a course for
students to complete.
assignment_id (PK) Unique identifier for the assignment.
course_id (FK) Identifies the course this assignment belongs to.

Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 32

title The name of the assignment.
deadline_at The final date and time for submission.
total_marks The maximum possible grade for the assignment.
publish_status Whether the assignment is currently active and
visible.

## Entity / Attribute Description
AssignmentSubmission Tracks the individual student submissions for
course assignments.
assignment_submission_id (PK) Unique identifier for the submission.
assignment_id (FK) Identifies the assignment being submitted for.
student_profile_id (FK) Identifies the student making the submission.
submitted_at Timestamp of when the work was submitted.
status The current state of the submission (e.g., graded,
pending).
score The grade awarded for the submission.
feedback_summary Instructor or reviewer comments on the submitted
work.

## Entity / Attribute Description
AdvisorAlert System-generated flags indicating a student may
need advisor intervention.
alert_id (PK) Unique identifier for the alert.
student_profile_id (FK) Identifies the student associated with the alert.
risk_level The severity of the alert (e.g., Low, Medium,
## High).
trigger_reason The specific condition or metric that caused the
alert to fire.
status The current state of the alert (e.g., open,
resolved).

## Entity / Attribute Description
ActivityLog A comprehensive audit trail of user actions
within the platform.
activity_id (PK) Unique identifier for the log entry.
user_id (FK) Identifies the user performing the action.
activity_type The category of action performed (e.g., login,
view, update).
target_type The type of entity affected by the action.
target_id The specific ID of the entity affected.
duration How long the activity lasted, if applicable.
metadata Additional contextual information regarding the
action.
timestamp The exact date and time the activity occurred.


Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 33

## Entity / Attribute Description
Announcement Broadcast messages sent out to target user
groups.
announcement_id (PK) Unique identifier for the announcement.
user_id (FK) Identifies the user who created the
announcement.
title The headline or subject of the announcement.
scope_type Defines the audience (e.g., site-wide, course-
specific).
status Whether the announcement is active, scheduled,
or archived.

## Entity / Attribute Description
Notification Direct alerts dispatched to individual users.
notification_id (PK) Unique identifier for the notification.
user_id (FK) Identifies the recipient user.
type The category of the notification (e.g., reminder,
grade update).
is_read Boolean flag indicating if the user has viewed the
notification.
sent_at Timestamp of when the notification was
delivered.

Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 34

5 Non-Functional Requirements
- Usability:  The  system  should  provide  a  clear  and  simple  interface  for  students,  instructors,
academic advisors, and admins with role-appropriate navigation.
- Performance: Core actions such as login, loading course pages, opening lessons, and submitting
quizzes should respond within an acceptable time under normal academic use.
- Reliability:  Quiz  attempts,  assignment submissions,  progress  records,  notifications,  and  activity
logs must be stored consistently without data loss under expected usage.
- Security:  Authentication,  role-based  access  control,  and  email  verification  must  be  enforced  to
protect user accounts and administrative functions.
- Maintainability: The system should use a structured modular design so future enhancements such
as deeper analytics or expanded gamification can be added without major redesign.
- Compatibility:  The  platform  should  be  accessible  through  common  modern  web  browsers  and
support embedded media and H5P content integration.
- Auditability:  Administrative  moderation,  notification  actions,  and  advisor  follow-up  events
should be traceable for review and oversight.

Software Requirements Specification for QuestLearn (Smart Interactive Learning System)
## Page | 35


## 6 References
- Akçapınar, G., Altun, A., & Aşkar, P. (2019). Using learning analytics to develop early-warning
system for at-risk students. International Journal of Educational Technology in Higher Education,
16, Article 40. https://doi.org/10.1186/s41239-019-0172-z
- Buenadicha-Mateos, M., Sánchez-Hernández, M. I., González-López, O. R., & Tato-Jiménez, J. L.
(2025). From engagement to achievement: How gamification impacts academic success in higher
education. Education Sciences, 15(8), Article 1054. https://doi.org/10.3390/educsci15081054
- Dennen, V. P., Arslan, Ö., & Bong, J. (2024). Optional embedded microlearning challenges:
Promoting self-directed learning and extension in a higher education course. Educational
Technology & Society, 27(1), 166–182. https://doi.org/10.30191/ETS.202401_27(1).SP04
- Foster, E., & Siddle, R. (2020). The effectiveness of learning analytics for identifying at-risk
students in higher education. Assessment & Evaluation in Higher Education, 45(6), 842–854.
- H5P. (n.d.). H5P – Create and share rich HTML5 content and applications. https://h5p.org/
- Imran, H. (2019). Evaluation of awarding badges on student’s engagement in gamified e-learning
systems. Smart Learning Environments, 6, Article 9. https://doi.org/10.1186/s40561-019-0093-2
- Lumi Education. (n.d.). Create H5P and host your content on Lumi. https://lumi.education/en/
- Morris, R., Perry, T., & Wardle, L. (2021). Formative assessment and feedback for learning in
higher education: A systematic review. Review of Education, 9, e3292.
https://doi.org/10.1002/rev3.3292
- Narciss, S., & Zumbach, J. (2022). Formative assessment and feedback strategies. In International
handbook of psychology learning and teaching (pp. 1359–1386). Springer.
https://doi.org/10.1007/978-3-030-28745-0_63
- Salhab, R., & Aboushi, M. M. (2026). Impact of AI-assisted microlearning on student engagement
in an online environment in higher education. Frontiers in Education, 11, Article 1766032.
https://doi.org/10.3389/feduc.2026.1766032
- Solis Trujillo, B. P., Velarde-Camaqui, D., Gonzales Nuñez, C. A., Castillo Silva, E. V., &
Gonzalez Said de la Oliva, M. del P. (2025). The current landscape of formative assessment and
feedback in graduate studies: A systematic literature review. Frontiers in Education, 10, Article
- https://doi.org/10.3389/feduc.2025.1509983
- Williams, A. (2024). Delivering effective student feedback in higher education: An evaluation of the
challenges and best practice. International Journal of Research in Education and Science, 10(2),
473–501. https://doi.org/10.46328/ijres.3404
