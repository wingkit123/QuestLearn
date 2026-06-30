_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **System Documentation** 

## **for** 

## **University Parcel Management System** 

## **Version <3.0>** 

## **Tutorial Section: T19L** 

## **Group No.: G9** 

|**Name**|**Student ID**|
|---|---|
|**Teo Hock Seng**|**1231302732**|
|**Chan Zheng Uee**|**1231302741**|
|**Phang Jun Yuan**|**1211110732**|
|**Woon Wen Tao**|**1211108861**|



## **Date: 12 February 2025** 

_**Page 1**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **Contents** 

Contents................................................................................................................................................2 Revisions...............................................................................................................................................6 1 Project Management..........................................................................................................................7 1.1 Team Members......................................................................................................................... 7 1.2 Problem statement.................................................................................................................... 7 1.3 Project Plan...............................................................................................................................8 **2 System Overview...........................................................................................................................9** 2.1 Description................................................................................................................................9 2.2 Actors......................................................................................................................................10 2.3 Assumptions and Dependencies............................................................................................. 11 2.4 Use Case Diagram.................................................................................................................. 13 3 Requirements...................................................................................................................................14 3.1 Class Diagrams / ERD............................................................................................................14 3.2 State Diagrams........................................................................................................................15 3.2.1 Administrative Management.......................................................................................................15 3.2.2 Parcel and Locker Management..................................................................................................16 3.2.3 User Parcel Management Portal..................................................................................................17 3.2.4 Parcel Delivery Management......................................................................................................18 4 Design..............................................................................................................................................19 4.1 Data Dictionary.......................................................................................................................19 4.2 Software Architecture.............................................................................................................24 4.2.1 Administrative Management......................................................................................... 25 4.2.2 Parcel and Locker Management.................................................................................... 26 4.2.3 User Parcel Management Portal..................................................................................................27 4.2.4 Parcel Delivery Management......................................................................................................28 4.3 Main Screens.......................................................................................................................... 29 4.3.1  Login  Interface(For all User):......................................................................................29 4.4 Administrative  Administrative Management Screens...........................................................31 4.4.1 Main Interface (Admin Dashboard):..................................................................................................31 4.4.2  Generate Report Interface..........................................................................................32 4.4.3  Report Interface..........................................................................................................33 4.4.4  Manage User Interface............................................................................................... 34 4.4.5  Add User Interface......................................................................................................35 4.4.6  Respond Feedback interface......................................................................................36 4.4.7  Respond Feedback Form interface............................................................................ 37 4.5  Parcel and Locker Management Subsystem........................................................................................ 38 

_**Page 2**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

4.5.1 Main Interface (Parcel Manager Home Page):.................................................................................. 38 4.5.2  Log Arrival Parcel....................................................................................................... 39 4.5.3  Organize Parcel..........................................................................................................40 4.5.4  Update Parcel Status..................................................................................................41 4.5.5  Monitor Locker Issues................................................................................................ 42 4.5.6  Assign Parcel to Locker..............................................................................................43 4.6  User Parcel Management Portal Screens.............................................................................................44 4.6.1  Main Interface (Student or Staff Dashboard):.............................................................44 4.6.2  Receive Parcel Interface:........................................................................................... 45 4.6.3  Send Parcel Interface:................................................................................................ 46 4.6.4  Track Parcel Interface:................................................................................................47 4.6.5  Report Locker Issue Interface:................................................................................... 48 4.6.6  Send Feedback Interface:.......................................................................................... 49 4.7  Parcel Delivery Management Screens................................................................................................. 50 4.7.1  Main Interface (Courier Dashboard):.......................................................................... 50 4.7.2  Collect Parcel............................................................................................................. 51 4.7.3  Parcel Manager List(Under Collect Parcel Interface)................................................. 52 4.7.4  Manage Parcel Status................................................................................................ 53 4.7.5  Notifications................................................................................................................ 54 4.7.6  Report Delivery Issue................................................................................................. 55 **4.8  Main Components................................................................................................................... 56** 4.8.1.1 Login (Admin) Component........................................................................................57 4.8.1.2 Generate Report Component................................................................................... 58 4.8.1.3 Manage User Component........................................................................................ 59 4.8.1.4 Respond Feedback Component...............................................................................60 4.8.2.1 Login (Parcel Manager) Component........................................................................ 61 4.8.2.2 Assign Parcel to Locker Component........................................................................ 63 4.8.2.3 Update Parcel Status Component............................................................................64 4.8.2.4 Organise Parcel Component.................................................................................... 66 4.8.2.5 Monitor Locker Issue Component.............................................................................67 4.8.6.6 Log Arrival Parcel Component..................................................................................67 4.8.3.1  Register Account (Student/Staff)............................................................................. 69 4.8.3.2  Login (Student/Staff) Component............................................................................ 69 4.8.3.3  Receive Parcel........................................................................................................ 70 4.8.3.4  Track Parcel.............................................................................................................71 4.8.3.5  Send Feedback....................................................................................................... 72 4.8.3.6  Send Parcel............................................................................................................. 73 4.8.3.7  Report Locker Issue................................................................................................ 74 4.8.4.1  Login (Courier) Component..................................................................................... 76 4.8.4.2  Deliver Parcel to University Component..................................................................76 4.8.4.3 Collect Outgoing Parcel Component........................................................................ 78 

_**Page 3**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

4.8.4.4  Report Delivery Issue Component...........................................................................79 4.9  Deployment Diagram.............................................................................................................81 5 Implementation................................................................................................................................82 5.1 Development Environment.....................................................................................................82 5.2 Software Integration............................................................................................................... 82 5.3 Database..................................................................................................................................91 6 Testing..............................................................................................................................................96 6.1 Testing Strategy...................................................................................................................... 96 6.2 Test Data................................................................................................................................. 96 6.2.1 Admin..........................................................................................................................................96 6.2.1.1 Login........................................................................................................................................ 96 6.2.1.2 Generate Report........................................................................................................................96 6.2.1.3 Manage User.............................................................................................................................97 6.2.1.4. Respond Feedback...................................................................................................................98 6.2.2 Parcel Manager............................................................................................................................99 6.2.3 Student / Staff............................................................................................................................102 6.2.3.1 Register...................................................................................................................................102 6.2.3.2 Login...................................................................................................................................... 102 6.2.3.3 Receive Parcel........................................................................................................................103 6.2.3.4 Track Parcel............................................................................................................................103 6.2.3.5 Provide Feedback................................................................................................................... 103 6.2.3.6 Send Parcel.............................................................................................................................104 6.2.3.7 Report Locker Issue................................................................................................................104 6.2.4 Courier.......................................................................................................................................105 6.2.4.1 Courier Login......................................................................................................................... 105 6.2.4.2 Collect Outgoing Parcel......................................................................................................... 105 6.2.4.3 Deliver Parcel to University...................................................................................................107 6.2.4.4 Report Delivery Issue............................................................................................................. 111 6.3 Acceptance Testing.........................................................................................................112 6.3.1 Admin........................................................................................................................................112 6.3.2 Parcel Manager..........................................................................................................................113 6.3.3 Student/Staff..............................................................................................................................115 6.3.4 Courier.......................................................................................................................................117 7 Sample Screens..............................................................................................................................118 7.1 Main Screen.......................................................................................................................... 118 7.1.1 Admin................................................................................................................................ 118 7.1.2 Parcel Manager..................................................................................................................124 7.1.3 Student/Staff....................................................................................................................129 7.1.4 Courier.............................................................................................................................134 8 Conclusion.....................................................................................................................................142 

_**Page 4**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 8.1 Completion of Software......................................................................................................................142 8.2 Software Quality Assurance............................................................................................................... 142 8.3 Group Collaboration........................................................................................................................... 142 8.4 Problems encountered.........................................................................................................................14 2 9 User Guide.....................................................................................................................................14 **3** 

_**Page 5**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

|**Version**|**Primary Author(s)**|**Description of Version**|**Date Completed**|
|---|---|---|---|
|1.0|Teo Hock Seng<br>Chan Zheng Uee<br>Phang Jun Yuan<br>Woon Wen Tao|Software Requirement Specification|8/12/2024|
|2.0|Teo Hock Seng<br>Chan Zheng Uee<br>Phang Jun Yuan<br>Woon Wen Tao|Software Design Specification|14/1/2025|
|3.0|Teo Hock Seng<br>Chan Zheng Uee<br>Phang Jun Yuan<br>Woon Wen Tao|Software Testing and Final Report Submission|12/2/2025|



_**Page 6**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **1 Project Management** 

## **1.1 Team Members** 

|Name|Actor/Processes|
|---|---|
|Teo Hock Seng|Admin|
|Woon Wen Tao|Parcel Manager|
|Phang Jun Yuan|Student/Staff|
|Chan Zheng Uee|Courier|



## **1.2 Problem statement** 

Managing parcel deliveries across universities presents significant challenges, including delays, lost items, and inefficient communication. Existing systems often lack the ability to provide timely updates, leading to frustration for users and logistical inefficiencies for university staff. The proposed University Parcel Management System (UPMS) aims to address these issues by offering up-to-date parcel tracking, ensuring that users are always informed of the current status of their parcels. By incorporating features like regular status updates, parcel assignment, and smart locker integration, the system reduces delays and enhances accountability. This approach ensures that all parties are kept informed through timely updates, improving overall communication and user experience. 

_**Page 7**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **1.3 Project Plan** 

This Gantt chart outlines a university project split into three parts over 15 weeks. Part 1 involves group formation, project planning, requirement analysis, and submission by Week 5 (8 December 2024). Part 2 covers database design, architecture and interface design, and submission by Week 12 (12 January 2025). Part 3 includes software development, testing, video presentation, and final submission by Week 15 (12 February 2025). Green indicates completed tasks, while blue shows tasks currently in progress, which is the final presentation. 

_**Page 8**_ 

**2 S stem Overview y** 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **2.1 Description** 

The University Parcel Management System (UPMS) is designed to facilitate efficient and reliable parcel handling between universities. The system integrates key functionalities such as up-to-date parcel tracking, sequenced parcel status updates, and smart locker management. It allows parcel managers to assign parcels, update statuses, and store them in lockers, while couriers can update the status of outgoing parcels until delivery to the destination university. Students and staff interact with the system to retrieve parcels from lockers and receive notifications. By enabling these interactions, the system ensures a smooth parcel-handling process, reducing delays, improving accountability, and providing a convenient user experience. 

Key processes include: 

1.Parcel Management: Parcel managers assign and organise parcels, ensuring accurate placement in smart lockers and tracking their status. 

2.Courier Operations: Couriers manage inter-campus parcel transfers and update delivery statuses. 

3.User Notifications and Locker Access: Students and staff receive notifications and interact with smart lockers to retrieve parcels. 

4.Up-to-date Tracking: Status changes are refreshed regularly to provide transparency and accuracy. 

_**Page 9**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **2.2 Actors** 

|**2.2 Actors**||
|---|---|
|Actor|Use Cases|
|Admin|●Login<br>●Generate Report<br>●Manage user<br>●Respond feedback|
|Parcel Manager|●Login<br>●Assign Parcel to Locker<br>●Update Parcel Status<br>●Organise Parcel<br>●Monitor Locker Issue<br>●Log Arrival Parcel|
|Student/Staff|●Login<br>●Register<br>●Receive Parcel<br>●Track Parcel<br>●Send Feedback<br>●Send Parcel<br>●Report Locker Issue|
|Courier|●Login<br>●Deliver Parcel to University<br>●Collect Outgoing Parcel<br>●Report Delivery Issues|



_**Page 10**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **2.3 Assumptions and Dependencies** 

1. The system assumes that all participating universities are equipped with compatible smart locker hardware to support parcel storage and retrieval. The lockers will use a 6-digit OTP, generated randomly, to ensure secure access for users. 

2. Users, including students, staff, couriers, and parcel managers, are equipped with smartphones or computers to interact with the system's web. 

3. A stable internet connection is available across all campuses to enable real-time communication. 

4. Couriers are responsible for updating the parcel statuses manually through the system after logging in. Their adherence to this process is critical to maintaining accurate and up-to-date parcel tracking. 

5. Received parcels (parcels arriving for recipients) will be placed on a waitlist if every locker is occupied until they are assigned to lockers. Lockers are used when the parcel is ready for pickup. 

6. Parcels sent by senders will always have a locker slot upon registration in the system. This ensures that a physical space is immediately reserved for these parcels in the lockers until they are retrieved by the parcel manager for dispatch, avoiding any interruption in the flow. 

7. Students and staff are responsible for packing their parcels securely and attaching the printed parcel label containing the necessary information (e.g., recipient details, destination, and unique parcel ID). This process ensures that parcels are prepared and identifiable when registered in the web application or handed over for delivery. 

8. The system minimises reliance on third-party APIs for tracking parcels. Instead, it relies on internal mechanisms and the accuracy of courier updates for tracking progress. 

9. The system prioritises inner notifications as the primary method for delivering up-to-date updates, such as when parcels are ready for pickup, assigned to lockers, or dispatched. As a secondary method, the system sends email or phone notifications to ensure users receive important updates (e.g., “Parcel is ready to collect with locker OTP:173834”) even if they are not actively using the system. Users are required to register valid email addresses and phone numbers to receive timely updates through both methods. 

10. Integration with existing university systems (e.g., authentication servers and user databases) is achievable without significant issues. 

11. The proper functioning of hardware components, such as barcode scanner, smart lockers, is assumed, with prompt support available for hardware maintenance. 

_**Page 11**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

12. Couriers are dependable and adhere to agreed delivery schedules for inter-campus parcel transfers. 

13. Parcel manager manually assigns a courier by generating a delivery ID and linking it to the parcel. This ensures proper identification and assignment to the appropriate courier. 

14. Both Origin and Destination Parcel Manager details will be initialised at the time of parcel registration. This ensures clarity in responsibilities and enhances tracking accuracy from the beginning of the delivery process. 

15. The user (sender or recipient) will be entitled to compensation as per the organisation's policy for handling parcel delivery issues. 

16. Each courier is responsible for completing a single delivery trip per day, ensuring they can focus on timely and accurate updates to the system. This simplifies scheduling, minimises the risk of errors, and supports the system's reliance on manual status updates by couriers. 

_**Page 12**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **2.4 Use Case Diagram** 

_**Page 13**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **3 Re uirements q** 

## **3.1 Class Diagrams / ERD** 

_**Page 14**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **3.2 State Diagrams** 

## **3.2.1 Administrative Management** 

The state diagram depicts a system featuring user authentication, report generation, user management, and feedback handling. Key states include login, password reset, report selection, user addition/modification, feedback submission, and response management. It enables seamless navigation between pages, allowing users to generate reports, manage user details, and respond to feedback, with the system responding dynamically to user interactions. 

_**Page 15**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **3.2.2 Parcel and Locker Management** 

The state diagram outlines the flow of the Parcel Manager system, starting at the Login Page, where users login to access the Parcel Manager Dashboard. The dashboard serves as the central hub, allowing parcel managers to log parcel arrivals, assign parcels to couriers, and update parcel statuses through dedicated pages. It also features a Monitor Locker Issue page for managing and filtering locker-related problems. Each page is designed for efficiency and seamless navigation, ensuring streamlined parcel management and issue resolution. 

_**Page 16**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **3.2.3 User Parcel Management Portal** 

The state diagram for the student and staff dashboard outlines its core functionalities and user interactions comprehensively. Successful login directs users to role-specific dashboards. Within the system, users can manage their parcels through tracking and physically receive parcels via OTP entry, report locker issues to parcel managers, and provide feedback to administrators. The diagram ensures clear navigation and backtracking options, accommodating different user roles with varying access levels, and includes features like parcel information viewing and feedback submission, enhancing overall user experience and system efficiency. 

_**Page 17**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **3.2.4 Parcel Delivery Management** 

The state diagram outlines the workflow of a courier system. Couriers start at the Login Page, where they can log in or exit. A successful login leads to the Courier Dashboard, which serves as the main hub. From here, they can perform actions like viewing the Delivery List, updating parcel statuses, reporting delivery issues, or handling notifications. In the Parcel List, users can view delivery parcels, mark them as collected, save delivery records and view parcel manager details. In the Report Delivery Issue section, users enter a parcel, fill in issue details, and notify relevant parties automatically. The Manage Parcel Status section allows users to change the status of a parcel and save the update. The Notification Main Page lets users view, send or reply notifications by entering recipient email and messages. 

_**Page 18**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

**4 Desi n g** 

## **4.1 Data Dictionary** 

|Table Name||Field Name|Data Type|Length|PK/<br>FK|Required|Null/Not<br>Null|Description|
|---|---|---|---|---|---|---|---|---|
|**University**||University_ID|VARCHAR|15|PK|Yes|Not Null|Unique identifier<br>for each university.|
|||University_Name|VARCHAR|100||Yes|Not Null|Name of the<br>university.|
|||University_Contact|VARCHAR|20||Yes|Not Null|Contact<br>information for the<br>university.|
|||University_Location|VARCHAR|50||Yes|Not Null|Location of the<br>university.|
|**Student/Staff**||User_ID|VARCHAR|15|PK|Yes|Not Null|Unique identifier<br>for each user.|
|||University_ID|VARCHAR|15|FK|Yes|Not Null|Reference to the<br>university the user<br>belongs to.|
|||User_Type|VARCHAR|15||Yes|Not Null|Type of user:<br>'Student' or 'Staff'.|
|||User_Name|VARCHAR|50||Yes|Not Null|Name of the user.|
|||User_Email|VARCHAR|30||Yes|Not Null|Unique email<br>address of the user.|
|||User_Password|VARCHAR|255||Yes|Not Null|Password for the<br>user account.|
|||User_Contact|VARCHAR|20||Yes|Not Null|Contact number of<br>the user.|
|||Login_Status|VARCHAR|15||Yes|Not Null|Login status:<br>'Active' and<br>'Inactive'.|
|**Parcel**<br>**Manager**||Manager_ID|VARCHAR|15|PK|Yes|Not Null|Unique identifier<br>for each parcel<br>manager.|



_**Page 19**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

|||Manager_Name|VARCHAR|50||Yes|Not Null|Name of the parcel<br>manager.|
|---|---|---|---|---|---|---|---|---|
|||Manager_Email|VARCHAR|30||Yes|Not Null|Unique email<br>address of the<br>manager.|
|||Manager_Password|VARCHAR|255||Yes|Not Null|Password for the<br>manager account.|
|||Manager_Contact|VARCHAR|20||Yes|Not Null|Contact number of<br>the manager.|
|||Manager_Work_<br>Branch|VARCHAR|20||Yes|Not Null|Work branch of the<br>manager.|
|**Smart Locker**||Locker_ID|VARCHAR|15|PK|Yes|Not Null|Unique identifier<br>for each locker.|
|||Locker_Location|VARCHAR|20||Yes|Not Null|Location of the<br>locker.|
|||Locker_Status|VARCHAR|20||Yes|Not Null|Status of the<br>locker: 'Available',<br>'Occupied',<br>'Reserved', etc.|
|**Courier**||Courier_ID|VARCHAR|15|PK|Yes|Not Null|Unique identifier<br>for each courier.|
|||Courier_Name|VARCHAR|50||Yes|Not Null|Name of the<br>courier.|
|||Courier_Email|VARCHAR|30||Yes|Not Null|Unique email<br>address of the<br>courier.|
|||Courier_Password|VARCHAR|255||Yes|Not Null|Password for the<br>courier account.|
|||Courier_Contact|VARCHAR|20||Yes|Not Null|Contact<br>information of the<br>courier.|
|**Delivery**||Delivery_ID|VARCHAR|15|PK|Yes|Not Null|Unique identifier<br>for each delivery.|
|||Courier_ID|VARCHAR|15|FK|Yes|Not Null|Courier assigned to<br>deliver parcels.|



_**Page 20**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

|||Deliver_Date|DATE|N/A||Yes|Not Null|Date when the<br>parcel is collected<br>by the courier for<br>outgoing shipment.|
|---|---|---|---|---|---|---|---|---|
|**Parcel Status**||Status_ID|VARCHAR|15|PK|Yes|Not Null|Unique identifier<br>for each status<br>type.|
|||Parcel_ID|VARCHAR|15|FK|Yes|Not Null|Parcel to be<br>updated status.|
|||Status_Type|VARCHAR|25||Yes|Not Null|Type of the parcel<br>status.|
|||Updated_by|VARCHAR|25||Yes|Not Null|Employee who<br>updated the parcel<br>status.|
|||Updated_At|DATETIME|N/A||Yes|Not Null|Date time when the<br>parcel status is<br>updated.|
|**Parcel**||Parcel_ID|VARCHAR|20|PK|Yes|Not Null|Unique identifier<br>for each parcel.|
|||Send_Locker_ID|VARCHAR|15|FK|Yes|Not Null|Locker ID for<br>sending the parcel.|
|||Receive_Locker_ID|VARCHAR|15|FK|No|Null|Locker ID for<br>receiving the<br>parcel. To be filled<br>when the parcel<br>arrived at  the<br>destination.|
|||Sender_User_ID|VARCHAR|15|FK|Yes|Not Null|User ID of the<br>sender.|
|||Recipient_User_ID|VARCHAR|15|FK|Yes|Not Null|User ID of the<br>recipient.|
|||Delivery_ID|VARCHAR|15|FK|No|Null|Current delivery of<br>the parcel.|
|||Send_Manager_ID|VARCHAR|15|FK|Yes|Not Null|Parcel manager<br>handling the send<br>process.|



_**Page 21**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

|||Receive_Manager_<br>ID|VARCHAR|15|FK|Yes|Not Null|Parcel manager<br>handling the<br>receive process.|
|---|---|---|---|---|---|---|---|---|
|||Parcel_Received_<br>at|DATETIME|N/A||No|Null|Date when receiver<br>collected the<br>parcel. Initially<br>unknown, will be<br>filled in when the<br>recipient collects<br>the parcel.|
|||Parcel_Sent_at|DATETIME|N/A||Yes|Not Null|Date when the<br>parcel was sent by<br>the sender.|
|**Waitlist**||Waitlist_ID|VARCHAR|15|PK|Yes|Not Null|Unique identifier<br>for the waitlist<br>record.|
|||Parcel_ID|VARCHAR|20|FK|Yes|Not Null|Reference to the<br>parcel in the<br>waitlist.|
|||Waitlist_Status|ENUM|N/A||Yes|Not Null|Status of the<br>waitlist entry.<br>'Waiting for<br>Locker',<br>'Completed'.|
|**Admin**||Admin_ID|VARCHAR|15|PK|Yes|Not Null|Unique identifier<br>for the admin.|
|||University_ID|VARCHAR|15|FK|Yes|Not Null|Reference to the<br>university the<br>admin belongs to.|
|||Admin_Name|VARCHAR|50||Yes|Not Null|Name of the admin.|
|||Admin_Email|VARCHAR|30||Yes|Not Null|Unique email<br>address of the<br>admin.|
|||Admin_Password|VARCHAR|255||Yes|Not Null|Password for the<br>admin account.|
|||Admin_Contact|VARCHAR|20||Yes|Not Null|Contact number of<br>the admin.|
|**Report**||Report_ID|VARCHAR|15|PK|Yes|Not Null|Unique identifier<br>for each report.|



_**Page 22**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

|||Admin_ID|VARCHAR|15|FK|Yes|Not Null|Reference to the<br>admin creating the<br>report.|
|---|---|---|---|---|---|---|---|---|
|||Report_Type|VARCHAR|20||Yes|Not Null|Type of the report.|
|||Report_Date|DATETIME|N/A||Yes|Not Null|Date when the<br>report was created.|



_**Page 23**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.2 Software Architecture** 

The university parcel management system is divided into 4 subsystems. All users must log in to access their respective subsystems and main screens. The system includes various subsystems such as administrative management, user parcel management portal, parcel delivery management, and parcel and locker management. 

|Subsystem|Team members|
|---|---|
|Administrative Management Subsystem|Teo Hock Seng|
|User Parcel Management Portal Subsystem|Phang Jun Yuan|
|Parcel and Locker Management Subsystem|Woon Wen Tao|
|Parcel Delivery Management Subsystem|Chan Zheng Uee|



_**Page 24**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.2.1 Administrative Management** 

The Administrative Management subsystem designed to provide administrators with the tools needed to oversee and manage system operations. It includes functionalities for generating reports, managing user accounts, and responding to user feedback, ensuring efficient and effective administration of the parcel management system. 

_**Page 25**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

**4.2.2 Parcel and Locker Management** 

The architecture of the University Parcel Management System features a modular design comprising six key components: Login, Parcel and Locker Management, Organize Parcel, Monitor Locker Issue, Assign Parcel to Locker, Update Parcel Status, and Log Arrival Parcel. Each component serves a specific purpose to streamline parcel and locker operations. The Login module manages user authentication, while the Parcel and Locker Management module oversees the overall system. Organize Parcel focuses on organizing parcels when they are sent out to the courier by the parcel manager. Monitor Locker Issue addresses locker-related problems, Assign Parcel to Locker maps parcels to lockers, Update Parcel Status tracks delivery progress, and Log Arrival Parcel records incoming packages systematically. Together, these components ensure a cohesive and efficient parcel management process. 

_**Page 26**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.2.3 User Parcel Management Portal** 

The Register Component manages new user sign-ups, allowing users to create accounts for system access. The Login Component handles user authentication, ensuring secure and authorized access to the system. The Student or Staff Dashboard Component serves as the central hub, providing access to key functions based on user roles. The Send Parcel Component enables users to manage the process of sending parcels, including scheduling and preparation. The Receive Parcel Component facilitates the receipt of incoming parcels, ensuring secure and organized collection. The Track Parcel Component allows users to monitor the status and location of their parcels in real-time. The Send Feedback Component provides a platform for users to submit feedback to improve system services. The Report Locker Issue Component allows users to report problems with locker systems, ensuring timely issue resolution. 

_**Page 27**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.2.4 Parcel Delivery Management** 

The Login Component handles user authentication and ensures authorised access. The Parcel Delivery Management Component acts as the central hub, managing and coordinating all delivery operations. The Deliver Parcel to University Component oversees the scheduling and delivery of parcels to the university. The Collect Outgoing Parcel Component facilitates the collection of parcels to be sent out, including labeling and pickup scheduling. The Report Delivery Issues Component allows users to log and manage delivery-related problems, ensuring proper issue resolution. 

_**Page 28**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.3 Main Screens** 

## **4.3.1  Login  Interface(For all User):** 

The login page for the parcel management system allows users to access their respective home screens by entering their username (ID) and password. If the entered credentials are not recognized, access is denied. Staff members, such as parcel managers, couriers, and administrators, are pre-registered and cannot sign up themselves. The sign-up option is exclusively available to new students and staff who need to register through the sign-up page before using the system. After registration, they are redirected to the login page to access the system. This ensures secure and controlled access to the University Parcel Management System features. 

_**Page 29**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.3.2 Sign Up Interface (For Student and Staff to register their account):** 

_**Page 30**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.4 Administrative  Administrative Management Screens** 

## **4.4.1 Main Interface (Admin Dashboard):** 

The interface is an admin dashboard for a parcel management system. It includes options to generate reports, manage users, and respond to feedback. Notifications show new feedback and parcel status updates, including received, delivered, and pending parcels. The dashboard provides a quick overview of system activities and user interactions. 

_**Page 31**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.4.2  Generate Report Interface** 

The Generate Report feature enables users to create customized reports by selecting the desired report type, such as a Monthly Summary. Users can specify the month, for example, January, and the year, such as 2024, to tailor the report to their needs. After setting these parameters, the system processes the data and generates a comprehensive report. 

_**Page 32**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.4.3  Report Interface** 

After clicking the "Generate Report" button, the system will redirect users to a dedicated report page interface. Here, the generated Monthly Summary Report will be displayed, providing a detailed overview of activities and metrics for the selected period. Users can view the report in a clear and organized format, with options to save or export it for further analysis or sharing. This seamless process ensures that users can easily access, review, and store their reports for future reference. 

_**Page 33**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.4.4  Manage User Interface** 

The interface provides a user management system where administrators can add or search for users by User ID or Name. It displays a list of users with details such as User ID, Name, Email, User Type (e.g., Student, Teacher, Admin), and Status (Active/Inactive). Each user entry includes options to Update or Delete their profile, enabling efficient user management and profile maintenance. 

_**Page 34**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.4.5  Add User Interface** 

After clicking "Add User" in the Manage User interface, administrators can create new user accounts, including roles such as Parcel Manager or Courier. This functionality allows for the seamless integration of new users into the system, ensuring that all necessary roles are accounted for and that users have the appropriate access and capabilities based on their responsibilities. 

_**Page 35**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.4.6  Respond Feedback interface** 

The interface allows administrators to view a list of user feedback. Each feedback entry has a button labeled as "Respond," which administrators can select to respond to the specific feedback. This setup enables administrators to efficiently review and address user feedback, ensuring timely and appropriate responses to enhance user satisfaction and service quality. 

_**Page 36**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.4.7  Respond Feedback Form interface** 

After clicking "Respond" on a feedback entry, a form is presented for the administrator to compose and submit a response. The administrator can then enter their response in a provided text field and submit it. This process allows for direct and efficient communication with users, addressing their feedback promptly and effectively. 

_**Page 37**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.5  Parcel and Locker Management Subsystem** 

## **4.5.1 Main Interface (Parcel Manager Home Page):** 

This Parcel Manager Dashboard UI provides a streamlined interface for managing parcel-related tasks. It features a personalized greeting, real-time notifications, parcel status summaries (received, delivered, and pending), and updates on locker conditions. The top navigation bar allows quick access to essential pages such as assigning parcels, logging arrivals, updating parcel status, and reporting delivery issues, ensuring efficient operations. 

_**Page 38**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.5.2  Log Arrival Parcel** 

The university parcel management system UI is designed for efficient parcel tracking and management. As a parcel manager, you can log the arrival of parcels by entering details such as Parcel ID, Courier ID, Recipient ID, and Status. The system allows you to assign parcels to couriers or lockers, update parcel statuses (e.g., Verified, Missing), and address locker issues. The dashboard provides an overview, while features like "Submit Verification" ensure accurate record-keeping. This streamlined interface helps manage parcel flow effectively within the university. 

_**Page 39**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.5.3  Organize Parcel** 

The "Assign Parcel to Courier" page is designed for efficient parcel dispatch management. It features a parcel list displaying essential details, including the sender, recipient, destination, and parcel status, with an option to assign parcels to couriers. The courier list provides a summary of available couriers, their IDs, names, and the number of parcels currently assigned to each. Users can select a courier for a specific parcel and finalize the assignment using the "Assign" button. The navigation bar facilitates seamless access to related functionalities, such as logging arrivals, updating parcel status, and managing locker issues. 

_**Page 40**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.5.4  Update Parcel Status** 

The "Update Parcel Status" page allows parcel managers to efficiently manage and update the status of parcels. It features a table listing parcel details such as Parcel ID, sender name, recipient, and current status. Managers can update the status of each parcel using a dropdown menu and confirm the changes with the "Update" button. This page streamlines the tracking process, ensuring real-time updates on parcel movements. The navigation bar provides quick access to other key functions, such as assigning parcels, logging arrivals, and addressing locker issues. 

_**Page 41**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.5.5  Monitor Locker Issues** 

The "Monitor Locker Issues" page is designed to track and address locker-related problems effectively. It features a table listing locker issues by Locker ID, location, the person who reported the issue, and a brief description of the problem. Users can filter the records using the Locker ID or the reporter's name, and apply filters using the "Apply Filters" button. This interface ensures easy monitoring and resolution of locker issues while maintaining clarity. The navigation bar enables quick access to related functionalities, such as parcel management and status updates. 

_**Page 42**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.5.6  Assign Parcel to Locker** 

The "Assign Parcel to Locker" page streamlines the process of allocating parcels to available lockers. It features two sections: Unassigned Parcels, listing parcels needing assignment with details like Parcel ID and Recipient, and Lockers, showing available lockers with their IDs. Users can select a parcel and a locker, with the choices displayed in the "Selected Parcel and Locker" section. The "Assign Parcel to Locker" button finalizes the assignment, ensuring efficient and secure parcel storage for recipient pickup. 

_**Page 43**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.6  User Parcel Management Portal Screens** 

## **4.6.1  Main Interface (Student or Staff Dashboard):** 

The user dashboard is designed for students and staff to manage their parcels efficiently. It offers features to receive parcels, send parcels, track their status, report locker issues, and provide feedback. Additionally, the dashboard delivers a concise summary of system activities and user interactions. 

_**Page 44**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.6.2  Receive Parcel Interface:** 

This interface confirms the arrival of a parcel and sends a notification with the locker OTP and specific locker location. Users are informed of their parcel's arrival and can use the provided OTP to access the locker. The user-friendly layout focuses on clearly presenting essential parcel retrieval details. 

_**Page 45**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.6.3  Send Parcel Interface:** 

The interface allows users to send parcels by providing the necessary information through input fields. Users can enter the sender's name and address, the receiver's name and address, and an optional parcel description. A button labeled "Send Parcel" is available for submitting the form. This setup streamlines the process of sending parcels, ensuring all required details are collected efficiently. 

_**Page 46**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.6.4  Track Parcel Interface:** 

The interface enables users to track their parcels by entering a tracking number into the provided input field. A "Track" button is available to initiate the tracking process. This feature ensures users can easily monitor the status and location of their parcels. 

_**Page 47**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.6.5  Report Locker Issue Interface:** 

The interface allows users to report locker issues by entering the locker number, selecting the issue type, and optionally describing the issue in a text box. A "Report Issue" button enables users to submit the report, ensuring efficient communication of locker problems to the management for timely resolution. 

_**Page 48**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.6.6  Send Feedback Interface:** 

The interface allows users to send feedback by entering their name and email (both optional), selecting a feedback type, and providing detailed feedback in a text box. A "Send Feedback" button enables users to submit their input, facilitating effective communication with administrators for service improvement. 

_**Page 49**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.7  Parcel Delivery Management Screens** 

## **4.7.1  Main Interface (Courier Dashboard):** 

The courier dashboard provides a quick overview of tasks and notifications. It welcomes the courier and shows a message about a reported parcel issue. The interface displays current and scheduled deliveries, the number of parcels collected, and any reported issues. This helps the courier stay organized and informed about their responsibilities. 

_**Page 50**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.7.2  Collect Parcel** 

The interface enables couriers to manage parcel collection tasks, including date-based searching to filter deliveries by specific dates. Couriers can view a list of parcels ready for pickup and mark them as collected. Additionally, the interface provides access to a list of parcel managers, allowing couriers to follow up or contact them in case of any issues. This functionality ensures efficient parcel management and clear communication channels for resolving delivery concerns. 

_**Page 51**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.7.3  Parcel Manager List(Under Collect Parcel Interface)** 

This interface displays a parcel manager list, showing key information about each parcel, including its ID, the origin and destination manager IDs, and their names. Users can click the "View Details" button for each parcel to access additional information, such as the managers' contact numbers, email addresses, and their working branches. This ensures effective communication and better parcel tracking. 

_**Page 52**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.7.4  Manage Parcel Status** 

This "Manage Parcel Status" interface allows users to monitor and update the status of parcels. It lists parcel details, including the Parcel ID, sender and recipient names, and the current delivery status. Users can search for a delivery using its ID, select delivery ID, view its status, and update it by selecting a new status from a dropdown menu and clicking the "Update" button. This feature ensures accurate tracking and up-to-date status updates for efficient parcel management. 

_**Page 53**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.7.5  Notifications** 

This interface allows users to view recent notifications related to parcels and deliveries, such as updates on completed deliveries or parcels ready for pickup. Additionally, it enables users to send custom notifications by specifying the recipient ID, title, and message, ensuring clear communication with recipients about parcel updates or issues. 

_**Page 54**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.7.6  Report Delivery Issue** 

The Report Delivery Issue main page is designed to assist couriers in reporting problems encountered during parcel deliveries. It offers a straightforward process for submitting issues. Couriers can select the type of issue they are facing from options such as Damaged Parcel, Lost Parcel, or Delayed Delivery. After selecting the appropriate issue type, there is a field labeled Issue Description where couriers can provide a detailed explanation of the problem. Once the necessary information is filled out, couriers can click the Submit Report button to send their report for further action by the courier service. This page is essential for addressing and resolving delivery-related concerns efficiently, ensuring smooth operations and customer satisfaction. 

_**Page 55**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.8  Main Components** 

|Subsystem||Component|
|---|---|---|
|Administrative Management Subsystem||Login (Admin) Component|
|||Generate Report Component|
|||Manage User Component|
|||Respond Feedback Component|
|User Parcel Management Portal Subsystem||Register (Student or Staff) Component|
|||Login (Student or Staff) Component|
|||Send Parcel Component|
|||Receive Parcel Component|
|||Track Parcel Component|
|||Send Feedback Component|
|||Report Locker Issue Component|
|Parcel and Locker Management Subsystem||Login (Parcel Manager) Component|
|||Assign Parcel to Locker Component|
|||Update Parcel Status Component|
|||Organise Parcel Component|
|||Monitor Locker Issue Component|
|||Log Arrival Parcel Component|
|Parcel Delivery Management Subsystem||Login(Courier) Component|
|||Deliver Parcel to University Component|
|||Collect Outgoing Parcel Component|
|||Report Delivery Issue Component|



_**Page 56**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.8.1.1 Login (Admin) Component** 

The Admin Login component ensures secure access by verifying user credentials. Upon successful login, the admin is redirected to the dashboard. If the login attempt fails, an error message is displayed, and a failed attempt counter is incremented. If the maximum number of failed attempts is reached, the account is locked, and the admin receives an email containing instructions to reset their password. Alternatively, admins can reset their password if they forget it. The activity diagram provided outlines this process. 

|Activity Diagram||Pseudocode|
|---|---|---|
|||START|
|||DISPLAY "Login Screen"|
|||PROMPT user FOR username, password|
|||IF VALID_CREDENTIALS(username,|
|||password) THEN|
|||AUTHENTICATE_USER(username)|
|||REDIRECT_TO("Courier Dashboard")|
|||EXIT|
|||ELSE|
|lid Credentials?|Prompts Login Error<br>Message|DISPLAY "Login Error: Invalid credentials"<br>REDIRECT_TO("Login Screen")|
|||EXIT|
|||END IF|
|Yes||END|



_**Page 57**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.8.1.2 Generate Report Component** 

The generate report component allows the admin to create and manage reports by navigating to the report module, selecting a report type, specifying filters, and generating the report. The system displays the report, allows it to be saved, and updates it in the system for recordkeeping or future reference.  The activity diagram above illustrates this process. 

|Activity Diagram|Pseudocode|
|---|---|
|Navigate to Report<br>Module<br>Select the type of<br>report to be generate<br>Specify Data Range<br>and Filters<br>Generate report<br>Display the report<br>Update report in<br>system<br>(a<br>»<br>we|Start<br>Navigate to the Report Module<br>Display available report types to the user<br>Prompt the user to select a report type<br>If the user selects a report type:<br>Prompt the user to specify the data range<br>(e.g., start date and end date)<br>Prompt the user to apply any filters (e.g.,<br>category, status, etc.)<br>Generate the report using the selected type,<br>data range, and filters<br>Display the generated report to the user<br>Prompt the user to save the report<br>If the user chooses to save the report:<br>Save the report to the system<br>Update the report records in the database<br>End|



_**Page 58**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.8.1.3 Manage User Component** 

The Manage User component allows the admin to handle user records through three key actions adding, updating, and deleting users. To add a user, the admin enters their information, saves it to the database, and the system sends the user an email with their login credentials. For updates, the admin searches for the user, makes the necessary changes, and saves them. To delete a user, the admin locates the user, confirms the deletion, and the system removes the record while logging the action. This process is shown in the activity diagram above. 

|Activity Diagram|Pseudocode|
|---|---|
|Navigate to user<br>management module<br>‘Add new user (for<br>parcel manager and<br>Update User Detail<br>Delete user<br>courier)<br>—<br>No<br>No<br>Disp<br>t<br>Save the<br>us<br>Display erroruser not<br>Replay orton user rok<br>><br>ve<br>the user record<br>ero<br>user found?<br>found<br>is user found<br>Yes<br>Yes<br>System sends an emailtouser<br>isplay the<br>us<br>with login credentialsoractivation<br>display the user<br>splay the user<br>instructions<br>record<br>record<br>No<br>Modify user details<br>Cancel the operation<br>Confirm Deletion?<br>Yes<br>Saveuser details<br>Delete the userfrom<br>the database<br>System updates the<br>user record in the<br>System logs the<br>database<br>deletion action<br>@|Start<br>Navigate to the user management module<br>While the user is in the module:<br>Prompt the user to choose an action: Add,<br>Update, or Delete<br>If the user chooses "Add":<br>Prompt the user to enter details (for parcel<br>manager or courier)<br>Save the user record<br>Send an email to the user with login<br>credentials or activation instructions<br>Else if the user chooses "Update":<br>Prompt the user to search for a user<br>If the user is found:<br>Display the user record<br>Prompt the user to modify user details<br>Save the updated user details<br>Update the user record in the database<br>Else:<br>Display error: "User not found"<br>Else if the user chooses "Delete":<br>Prompt the user to search for a user<br>If the user is found:<br>Display the user record<br>Prompt the user to confirm deletion<br>If the user confirms deletion:<br>Delete the user from the database<br>Log the deletion action<br>Else:|



_**Page 59**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

Cancel the operation Else: Display error: "User not found" Else: Display error: "Invalid action selected" End 

_**Page 60**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.8.1.4 Respond Feedback Component** 

The Respond to Feedback component allows the admin to effectively manage user feedback by accessing the feedback module, viewing the list of feedback entries, selecting a specific entry, and reviewing its details. Once the response is sent to the user, the system logs it for recordkeeping and future reference, promoting accountability and continuous improvement. This process is detailed in the activity diagram above. 

|Activity Diagram|Pseudocode|
|---|---|
|Navigate to feedback<br>Module<br>view feedback list<br>select a feedback<br>entry<br>Review Feedback<br>details<br>Send response to<br>user<br>Log Feedback<br>Respond<br>nh»@|Start<br>Naviga<br>te to the feedback module<br>Display a list of available feedback<br>Prompt the user to select a feedback<br>If a feedback is selected:<br>Review the selected feedback<br>Prompt the user to respond to the feedback<br>If the user chooses to respond:<br>Enter a response to the feedback<br>Save the response<br>Display confirmation: "Response sent<br>successfully"<br>Else:<br>Cancel the response process<br>Else:<br>Display error: "No feedback selected"<br>End|



_**Page 61**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.8.2.1 Login (Parcel Manager) Component** 

The login activity diagram outlines the process for a Parcel Manager to access the system. It begins with the user entering their ID and email to log in. If the authentication is successful, they are redirected to the parcel manager dashboard. If the login fails, the system increments the failed attempts counter and displays a login error message. After a certain number of failed attempts, the account is locked, and the user is redirected to reset their password. The user can then enter a new password to reset it and regain access to the system. This process ensures secure and controlled access to the parcel management system. 

|access to the parcel management system.||
|---|---|
|**Activity Diagram**|**Pseudocode**|
|falid Credentials?<br>Prompts Login Error<br>Message<br>Forgot<br>Password?<br>User is authenticated<br>Enter Parcel Manager|<br>Increment in Failed<br>ID and email<br>Attempts<br>Redirected to parcel<br>manager dashboard<br>No<br>Exceed<br>Enternewpassword<br>Maximum<br>Attempt?<br>Yes<br>@<br>Resetpassword<br>Lock Account and<br>redirect to Reset<br>Password|BEGIN<br>DISPLAY "Login"<br>PROMPT user FOR ID AND PASSWORD<br>IF user IS authenticated THEN<br>REDIRECT TO admin dashboard<br>ELSE<br>INCREMENT failed_attempts<br>IF failed_attempts >= MAX_ATTEMPTS<br>THEN<br>LOCK account<br>REDIRECT TO "Reset Password"<br>ELSE<br>DISPLAY "Login Error"<br>PROMPT user FOR ID AND<br>PASSWORD AGAIN<br>END IF<br>END IF<br>IF user SELECTS "Forgot Password" THEN<br>DISPLAY "Enter Parcel Manager ID and<br>email"<br>PROMPT user FOR ID AND EMAIL<br>IF ID AND EMAIL ARE VALID THEN<br>DISPLAY "Enter new password"<br>PROMPT user FOR NEW<br>PASSWORD<br>RESET password WITH NEW<br>PASSWORD<br>DISPLAY "Password reset<br>successfully"<br>REDIRECT TO parcel manager<br>dashboard<br>ELSE<br>DISPLAY "Invalid ID or email"|



_**Page 62**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

END IF END IF END 

_**Page 63**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.8.2.2 Assign Parcel to Locker Component** 

This activity diagram represents the process of handling parcels at a university, where the parcel's details (name, ID, and address) are verified for accuracy, and either the information is updated in the system or the parcel is returned to the courier if the details are incorrect. 

|**Activity Diagram**||**Pseudocode**|
|---|---|---|
|||START|
|||CHECK Locker Availability|
|||IF locker is available THEN|
|Check Locker||PLACE parcel into the locker|
|Availability||GENERATE six-digit OTP|
|||NOTIFY recipient with OTP|
|||ELSE|
|||RECORD parcel to waitlist|
|No||END IF|
|Locker|Record parcel to||
|enough?|waitlist|END|



_**Page 64**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.8.2.3 Update Parcel Status Component** 

This activity diagram outlines the process of updating a parcel's status, starting with checking its path with the courier centre, confirming its arrival and notifying the user, and finally updating the status to indicate whether the parcel has been taken. 

**Activity Diagram Pseudocode** BEGIN CHECK parcel path WITH Courier Center IF parcel HAS ARRIVED THEN SEND message TO user: "Your Parcel has Check the parcel path been delivered." with Courier Center WHILE parcel has NOT been TAKEN THEN SEND message TO user: "Your Parcel No has been delivered." Arrived? Pp user SEND message TO user: “Your parcel Yes has been taken” ELSE “YourUpdateParcelthe message:has been UPDATE parcel arrived port TO user delivered." to the user END 

_**Page 65**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.8.2.4 Organise Parcel Component** 

This activity diagram represents the process of organising parcels, starting from checking the send-out parcel list, retrieving parcels from lockers, distributing them by destination, sending them to the courier, and notifying users about the parcel status. 

|**Activity Diagram**|**Pseudocode**|
|---|---|
||START|
||CHECK the send-out parcel list|
||TAKE out the parcel from the locker|
|Check the send out||
|parcel list|DISTRIBUTE the parcel according to the|
||destination|
||SEND parcel to courier|
|Take out the parcel||
|from locker|NOTIFY user about the parcel status|
||END|



_**Page 66**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.8.2.5 Monitor Locker Issue Component** 

The activity diagram depicts the process of identifying locker issues, updating their status to maintenance, and assigning the case to the technical team for resolution. 

|**Activity Diagram**|**Activity Diagram**|**Pseudocode**|
|---|---|---|
|||START|
|||CHECK locker issues|
|||UPDATE locker status as "Maintenance"|
|||ASSIGN the case to the technical team|
|Check|locker issues|END|



## **4.8.6.6 Log Arrival Parcel Component** 

_**Page 67**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

This activity diagram represents the process of logging the arrival of a parcel, starting with the parcel's arrival at the university, verifying the name, ID, and address, checking if all information is correct, and either contacting the courier to return the parcel if incorrect or updating the parcel information into the system if correct. 

|**Activity Diagram**|**Pseudocode**|
|---|---|
||START|
||WHEN parcel arrives at the university THEN|
||CHECK the name, ID, and address of the|
||parcel|
|Parcel arrived to||
|university|IF all information is correct THEN|
||UPDATE all parcel information into the|
||system|
||ELSE|
|Check the name, id<br>and address|UPDATE status to “Missing”<br>CONTACT the courier and RETURN the|
||parcel|
||END IF|
||END|



_**Page 68**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.8.3.1  Register Account (Student/Staff)** 

The below activity diagram represents the register process for students or staff to access the system. User enters the email and password to register the account. The database will ensure that the email is not an existing email. 

|is not an existing email.||
|---|---|
|Activity Diagram|Pseudocode|
|.<br>Enter email and<br>password to register<br>no<br>alid Credentials?<br>message<br>yes<br>Account has been<br>registered<br>7<br>we|Start<br>Display "Enter email and password to<br>register"<br>Input email<br>Input password<br>If email format correct Then<br>If email not in registered_emails Then<br>Add email and password to<br>registered_emails<br>Display "Account has been<br>registered"<br>Else<br>Display "Error: Email already<br>exists"<br>End If<br>Else<br>Display "Error: Invalid email or<br>password"<br>End If<br>End|



## **4.8.3.2  Login (Student/Staff) Component** 

_**Page 69**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

The below activity diagram represents the login process for students or staff to access the system. User enters email and password, which is verified against the system database to ensure it is accurate and permits successful access. User is alerted and requested to try again if the credentials are invalid. Furthermore, users also can reset their password using the register id and email. 

|Activity Diagram|Pseudocode|
|---|---|
|.<br>.<br>Prompts Login Error<br>vi]<br>Yes<br>Redirected to courier<br>dashboard<br>?<br>i@<br>\<br>f<br>————|START<br>DISPLAY "Login Screen"<br>PROMPT user FOR username, password<br>IF VALID_CREDENTIALS(username,<br>password) THEN<br>AUTHENTICATE_USER(username)<br>REDIRECT_TO("Courier Dashboard")<br>EXIT<br>ELSE<br>DISPLAY "Login Error: Invalid<br>credentials"<br>REDIRECT_TO("Login Screen")<br>EXIT<br>END IF<br>END<br>DISPLAY "Error: Invalid Counter<br>ID or Email"<br>EXIT<br>END IF<br>ELSE<br>REDIRECT_TO("Login Screen")<br>EXIT<br>END IF<br>END IF<br>END IF<br>END|



## **4.8.3.3  Receive Parcel** 

_**Page 70**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

The diagram illustrates the procedure for students or staff to receive a parcel. Users receive a notification along with the location of the locker and a specific locker password. To access and retrieve the package from the locker, users need to provide the locker password credentials, which the system confirms against its database. 

|Activity Diagram|Pseudocode|
|---|---|
|Receive parcel<br>arrived notification<br>Enter 6 digit locker<br>password<br>No<br>‘alid Credentials?<br>message<br>Yes<br>Retrieve Parcel<br>Coniirm Retrieval<br>fa@<br>—|Start<br>Display notification: "Parcel has arrived."<br>User accesses locker<br>Prompt user to enter 6-digit locker<br>password<br>If entered password is valid Then<br>Allow user to retrieve parcel<br>Prompt user: "Confirm retrieval?"<br>If user confirms Then<br>Mark parcel as retrieved<br>Display message: "Parcel retrieval<br>confirmed."<br>Else<br>Display message: "Retrieval<br>cancelled."<br>End If<br>Else<br>Display error message: "Invalid<br>password. Please try again."<br>End If<br>End|



## **4.8.3.4  Track Parcel** 

_**Page 71**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

The below diagram represents the process of a student or staff member tracking their parcel.The parcel ID and the parcel tracking number are identical. As a result, users can enter a valid parcel ID to view the parcel status. Users can also get in touch with customer service if the provided package ID is incorrect. 

|Activity Diagram|Pseudocode|
|---|---|
|Receive parcel<br>tracking number<br>Accesses parcel<br>status<br>Contact customer<br>support<br>racking numbel<br>found?<br>Yes<br>Display parcel status<br>—_|Start<br>Display "Enter identifier:"<br>Input identifier<br>If identifier is valid Then<br>If identifier exists in system Then<br>Retrieve status of entity<br>Display status<br>Else<br>Display "Entity not found. Contact<br>support."<br>End If<br>Else<br>Display "Invalid identifier. Please try<br>again."<br>End If<br>End|



## **4.8.3.5  Send Feedback** 

_**Page 72**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

The below diagram represents the process of a student or staff member providing feedback. General comments and system feedback are the two categories of feedback. Users can provide management with feedback by completing the feedback form. 

|Activity Diagram|Pseudocode|
|---|---|
|Select feedback type<br>Fill feedback form<br>Submit feedback|Start<br>Display "Please select a feedback type:"<br>List available feedback types (e.g.,<br>"Product Feedback", "Service Feedback",<br>"Bug Report")<br>User selects feedback type<br>Set feedbackType to user's selection<br>Display feedback form corresponding to<br>feedbackType<br>User fills out the feedback form<br>Set feedbackData to user's input<br>If feedbackData is complete Then<br>Submit feedbackData to the system<br>Display "Thank you for your<br>feedback!"<br>Else<br>Display "Please complete all required<br>fields."<br>End If<br>End|



## **4.8.3.6  Send Parcel** 

_**Page 73**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

The below diagram represents the process of a student or staff member sending parcels to another university. Users must first register the parcel details and provide the registered recipient's information in the system. The university will cover shipping costs for staff, while students' shipping costs will be added to their university invoices. Finally, users place the packed parcels into the designated locker to complete the sending process. 

|Activity Diagram||Pseudocode|
|---|---|---|
|||Start|
|||Register parcel information (sender,|
|||receiver, parcel details)|
|Register Parcel||Check if the user is a staff member:|
|informations|||
|||If staff:|
|||Charge shipping cost to university|
|||Else:|
|Receive:||Collect payment for shipping|
|User ID<br>found?|User not found|Confirm parcel details|
|||Generate label and receipt|
|Yes||Place parcel into locker|
|Check Own User<br>AccountType||Display "Parcel sent successfully"<br>End|



## **4.8.3.7  Report Locker Issue** 

_**Page 74**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

The below diagram represents the process of a student or staff member reporting locker issues. sers can choose from various issue types and submit a feedback form to report their locker problems. Additionally, users can monitor the status of their reported issues for updates and resolution. 

|Activity Diagram|Pseudocode|
|---|---|
||Start|
||Ask the user to select the type of locker|
||issue (e.g., broken lock, damaged locker,|
||lost key)|
||Prompt the user to describe the issue|
|Select type of issue|Submit the report and generate a report|
||ID|
||Notify the user of successful report|
||submission with the report ID|
||Provide options for follow-up if needed|
|Describelockerissue|End|



## **4.8.4.1  Login (Courier) Component** 

_**Page 75**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

The diagram outlines the courier's login process. The courier begins by entering their login credentials. If the credentials are valid, the user is authenticated and redirected to the courier dashboard. If the credentials are invalid, the system prompts a login error message and redirects back to the login screen. 

|**Activity Diagram**|**Activity Diagram**|**Activity Diagram**||||**Pseudocode**|
|---|---|---|---|---|---|---|
|||||||START|
|||||||DISPLAY "Login Screen"|
|||||||PROMPT user FOR username, password|
|||||||IF VALID_CREDENTIALS(username,|
|||||||password) THEN|
|||||||AUTHENTICATE_USER(username)|
|||||||REDIRECT_TO("Courier Dashboard")|
|||||||EXIT|
|||||||ELSE|
|.|.|vi]|Prompts|Login|Error|DISPLAY "Login Error: Invalid credentials"|
|||||||REDIRECT_TO("Login Screen")|
|||||||EXIT|
||Yes|||||END IF|
|||||||END|



## **4.8.4.2  Deliver Parcel to University Component** 

_**Page 76**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

The courier updates the status of the parcel to "In Transit" and navigates to the destination university. Upon arrival, the courier updates the status to "Arrived to University" and notifies the Parcel Manager. The courier then hands over the parcel to the Parcel Manager and updates the status to "Handed Over to Parcel Manager". This process ensures that the parcel's status is precisely monitored and updated at every step, successfully concluding the delivery to the university. 

|**Activity Diagram**|**Pseudocode**|
|---|---|
|Update Status<br>(eg:In Transit)<br>Navigateto Another<br>University<br>Update Status<br>(eg:Arived to Uni)<br>Notify Parcel<br>Manager<br>Hand Over Parcel to<br>Parcel Manager<br>Update Status to<br>Handed Over to<br>Parcel Manager<br>@<br>bl|START<br>navigate to the parcel delivery module<br>WHILE the parcel is in transit:<br>update the parcel status to "In Transit"<br>navigate to the university<br>ONCE arrived at the university:<br>update the parcel status to "Arrived to<br>Uni"<br>notify the parcel manager about the parcel<br>arrival<br>IF the parcel manager is available:<br>hand over the parcel to the parcel<br>manager<br>update the parcel status to "Handed<br>Over to Parcel Manager"<br>log the delivery completion<br>ELSE:<br>wait for the parcel manager to become<br>available<br>retry handing over the parcel<br>END IF<br>END ONCE<br>IF any error occurs during delivery:<br>log the error<br>notify the parcel manager about the issue<br>attempt to resolve the issue or reschedule<br>delivery<br>END IF<br>END WHILE<br>END|



## **4.8.4.3 Collect Outgoing Parcel Component** 

_**Page 77**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

The courier receives a notification from the Parcel Manager regarding outgoing parcels. The courier then navigates to the university to collect the parcel from the Parcel Manager. The courier updates the status in the system to "Parcel Collected". After parcel collection is done, the courier updates the status to "Parcel outgoing" and retrieves the parcel, thereby completing the process. This sequence ensures that the parcel's status is accurately tracked and updated throughout the collection process. 

|**Activity Diagram**|**Pseudocode**|
|---|---|
|Receive Notification<br>from Parcel Manager<br>Navigate to University<br>Collect Parcel fram<br>Parcel Manager<br>Update Status<br>(eg: Parcel Collected)<br>Confirm Collection<br>Update Status<br>(eg: Parcel outgoing)<br>@<br>=|START<br>navigate to the parcel collection module<br>WHILE the parcel is ready for collection:<br>navigate to the university<br>ONCE arrived at the university:<br>notify the parcel manager about the parcel<br>collection<br>IF the parcel manager is available:<br>collect the parcel from the parcel<br>manager<br>update the parcel status to "Parcel<br>Collected"<br>log the collection completion<br>update the parcel status to "Parcel<br>Outgoing"<br>ELSE:<br>wait for the parcel manager to become<br>available<br>retry collecting the parcel<br>END IF<br>IF any error occurs during collection:<br>log the error<br>notify the courier and parcel manager<br>about the issue<br>attempt to resolve the issue or<br>reschedule collection<br>END IF<br>END ONCE<br>END WHILE|



_**Page 78**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.8.4.4  Report Delivery Issue Component** 

When a delivery issue arises, such as a parcel being damaged or missing, the courier identifies the issue and reports it. The system then updates the status to reflect the specific problem (e.g., "Parcel damaged" or "Parcel missing, etc"). Following this update, both the Parcel Manager and the user are notified about the issue. This process ensures that the delivery issue is properly documented and communicated, finalising the issue reporting. 

|**Activity Diagram**|**Pseudocode**|
|---|---|
|Identify issue with<br>delivery<br>Report Delivery Issue<br>Update Status in<br>system<br>(Parcel damaged/<br>Missing)<br>Notify Parcel<br>Managerand User<br>()<br>—|START<br>navigate to the report delivery issue module<br>WHILE there is an issue with delivery:<br>identify issue with delivery<br>report delivery issue<br>update status in system to "Parcel Damaged"<br>or "Missing"<br>notify parcel manager and user about the<br>issue<br>IF notification is successful:<br>log notification success<br>ELSE:<br>retry notification<br>IF retry is successful:<br>log notification success<br>ELSE:<br>escalate issue to admin<br>END IF<br>END IF<br>IF any error occurs during reporting:<br>log the error<br>notify courier and parcel manager about<br>the issue<br>attempt to resolve the issue or reschedule<br>reporting<br>END IF<br>END WHILE<br>END|



_**Page 79**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **4.9  Deployment Diagram** 

The deployment diagram outlines the architecture of the University Parcel Management System, highlighting key components and their interactions. The system is supported by a Web Server, which handles user requests and application logic, and a Database Server (MySQL Database) that stores and manages data. Users access the system via a web browser on their personal computers, which communicates with the Web Server to retrieve or update information from the Database Server. 

_**Page 80**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **5 Im lementation p** 

## **5.1 Development Environment** 

The University Parcel Management System is developed using Python Flask within Visual Studio Code (VS Code). Flask, a lightweight web framework, provides the flexibility needed for handling parcel records and user management. The development environment includes Python3, a virtual environment for dependency management, and pip for installing required libraries like Flask and SQLAlchemy. The system runs on Flask’s built-in development server and utilises SQLite for data storage. Version control is managed using Git and GitHub, ensuring efficient collaboration. The frontend is built using **HTML, CSS, and JavaScript** , with **Jinja2** and Flask templating engine for rendering dynamic content. The system also utilised Flask’s session to temporarily store notifications, ensuring they persist across requests without being stored in the database. 

## **5.2 Software Integration** 

|File|Description|
|---|---|
|webapp/__init__.py|To initialise a database, manages authentication, registers<br>blueprints for different user roles, and handles parcel<br>management.|
|main.py|Creates a Flask app instance using create_app() and runs the<br>application when the script is executed directly.|
|webapp/models.py|Defines database models (SQLAlchemy ORM<br>classes) used to manage data storage.|
|webapp/static/|Holds static assets like CSS, JavaScript, and images used for<br>frontend design and styling.|
|webapp/templates/|Contains HTML templates used to generate and display dynamic<br>content on web pages.|



_**Page 81**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **webapp/_init__.py** 

_**Page 82**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **main.py** 

_**Page 83**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **webapp/models.py** 

_**Page 84**_ 

## _**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

_**Page 85**_ 

**==> picture [387 x 11] intentionally omitted <==**

**----- Start of picture text -----**<br>
Software Requirements Specification for University Parcel Management System (Version 3.0)<br>**----- End of picture text -----**<br>


_**Page 86**_ 

## _**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

_**Page 87**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **webapp/static/** 

_**Page 88**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **webapp/templates/** 

_**Page 89**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **5.3 Database** 

The database is implemented using **Flask-SQLAlchemy** , an ORM (Object Relational Mapper) for Flask applications, following our ER diagram in **Section 3** . Each database table is represented as a **Python class** , where attributes correspond to table columns, and relationships are managed using db.ForeignKey() and db.relationship(). 

_**Page 90**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

_**Page 91**_ 

## _**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

_**Page 92**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

_**Page 93**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

_**Page 94**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **6 Testin g** 

## **6.1 Testing Strategy** 

In this project, we are utilizing an integration testing strategy to ensure that all components of the parcel management system work together seamlessly. Integration testing focuses on verifying the interaction between different modules of the system, including parcel management, locker assignments, waitlist management, and status updates. The strategy involves testing how these components collaborate and ensuring that data flows correctly between them. 

## **6.2 Test Data** 

## **6.2.1 Admin** 

## **6.2.1.1 Login** 

This test data is used to verify that the admin login the system by entering the required information. 

|Use Case|Test Data|
|---|---|
|Login|User email: john.doe@gmail.com<br>Password: JohnDOE@12345|



## **6.2.1.2 Generate Report** 

This test data is used to generate a monthly summary report. 

|Use Case|Test Data|
|---|---|
|Generate Report|Step 1: Generate Report Page:<br>●Select month and year for report<br>generation.<br>●Will generate reports based on data in the<br>database.<br>Month : January<br>Year : 2025<br>Step 2 : Monthly Summary Report Page:<br>●Will list out data like total parcels received ,|



_**Page 95**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

total parcels delivered, pending parcels, most active users. Total Parcels Received : 20 Total Parcels Delivered: 20 Pending Parcels: 0 Most Active Sender: Cheah Jia Ming Total Parcels: 5 Most Active Sender: Kamarul Bin Mohamad Total Parcels: 5 

## **6.2.1.3 Manage User** 

This test data to update or delete student and staff  and add parcel manager and courier to information the database 

|Use Case|Test Data|
|---|---|
|Manage User|Step 1: Manage User Page<br>●Admin can choose to update or delete<br>student and staff user information.<br>Student info before updated:<br>User_1D: STU37909093<br>User_Name: Tan Wei Ling<br>User_Email: tan.weiling@mmu.edu.my<br>User_Contact: +6014-5678904<br>Student info after updated:<br>User_1D: STU37909099<br>User_Name: Tan Wei Xing<br>User_Email: tan.weixing@mmu.edu.my<br>User_Contact: +6014-5688904<br>Step 2: Add User<br>●Admin can add a new parcel manager and<br>courier to the database.<br>Enter data for parcel manager:<br>Manager_Name: Chris Leong<br>Manager_Email: chris.leong@trackiq.com<br>Manager_Password: password123<br>Manager_Contact: +609-549-2389|



_**Page 96**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

Manager_Work_Branch: UM Then click Add User button Enter data for courier: Courier_Name: VInce Chan Courier_Email: vince.chan@trackiq.com Courier_Password: password123 Courier_Contact: +609-549-238 

## **6.2.1.4. Respond Feedback** 

This test data to respond to feedback from student and staff 

|Use Case|Test Data|
|---|---|
|Respond Feedback|Step 1 View Feedback Page:<br>select feedback to respond<br>**User_ID:**STU81165078<br>**User_Name:**Chong Mei Ling<br>**Feedback_Type:**General<br>**Content:**Nice fast delivery<br>click respond button<br>Step 2 Respond Feedback Page:<br>admin_repond: Alright Thank you for the respond|



_**Page 97**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **6.2.2 Parcel Manager** 

|**Use Case**|**Test Data**|
|---|---|
|Login|**User Email:**wentao.woon@trackiq.com<br>**Password:**password123|
|Organize Parcel|**Step 1: Notification Page**<br>-<br>Send a notification to the courier to<br>announce the date of sending the parcel.<br>**Notification send:**<br>To: daniel.chan@trackiq.com<br>Title: Date of Delivery<br>Message:<br>The parcel for delivery ID DEL39661665 will be<br>delivered on 2025-02-11.<br>**Step 2: Organize Parcel Page**<br>-<br>Select the parcel and set the date and<br>courier to group together.<br>**Delivery ID:**DEL39661665<br>**Parcel ID:**PAR75653826, PAR15304680<br>**Courier:**Daniel Chan<br>**Delivery Date:**2025-02-11|
|Log Arrival Parcel|**Step 1: Notification Page**<br>-<br>Receive the notification from the courier<br>To: wentao.woon@trackiq.com<br>Subject: Pickup your parcels<br>Your parcel with Parcel ID PAR85159946 is ready<br>to pick up.<br> _daniel.chan@trackiq.com, 2025-02-11   18:54:22_<br>**Step 2: Log Arrival Page**<br>-<br>Confirm the parcel<br>**1. If the parcel is arrived safety**<br>**Parcel ID:**PAR85159946<br>**Courier ID:**COU03195870<br>**Courier Name:**Daniel Chan<br>**Recipient ID:**STU34377400<br>**Recipient Name:**Aminah binti Hassan<br>**Location:**Multimedia University Cyberjaya<br>(MMU)|



_**Page 98**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

||**Status:**Verified - Collected<br>**2. If the parcel missing or damaged**<br>**Parcel ID:**PAR85159946<br>**Courier ID:**COU03195870<br>**Courier Name:**Daniel Chan<br>**Recipient ID:**STU34377400<br>**Recipient Name:**Aminah binti Hassan<br>**Location:**Multimedia University Cyberjaya<br>(MMU)<br>**Status:**Verified - Missing / Verified - Damaged|
|---|---|
|Update Parcel Status|**Step 1: Log Arrival Parcel Page**<br>-<br>Mark the status as “Verified - Collected”<br>**Parcel ID:**PAR85159946<br>**Courier ID:**COU03195870<br>**Courier Name:**Daniel Chan<br>**Recipient ID:**STU34377400<br>**Recipient Name:**Aminah binti Hassan<br>**Location:**Multimedia University Cyberjaya<br>(MMU)<br>**Status:**Verified - Collected<br>**Step 2: Update Parcel Status Page**<br>-<br>Update the status “Arrived” to let student or<br>staff know<br>**Parcel ID:**PAR85159946<br>**Sender Name:**Tan Wei Ling<br>**Recipient Name:**Aminah binti Hassan<br>**Status:**Arrived|
|Assign Parcel to Locker|**Step 1: Update Parcel Page**<br>-<br>The parcel status will be updated as<br>“Arrived”<br>**Parcel ID:**PAR85159946<br>**Sender Name:**Tan Wei Ling<br>**Recipient Name:**Aminah binti Hassan<br>**Status:**Arrived<br>**Step 2: Assign Parcel to Locker**<br>-<br>Select the parcel and choose the locker to<br>assign it<br>1. Parcel available<br>Parcel ID: PAR85159946<br>Sender Name: Tan Wei Ling<br>Recipient: Aminah binti Hassan|



_**Page 99**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

||Locker ID: MMUCLOC008<br>Status: Available<br>2. Parcel not available<br>Parcel ID: PAR85159946<br>Sender Name: Tan Wei Ling<br>Recipient: Aminah binti Hassan<br>Add to waitlist|
|---|---|
|Monitor Locker Issue|Step 1: Monitor Locker Issue<br>1. If parcel assign to Locker<br>Locker ID: MMUCLOC008<br>Locker Location: MMU Student Center -<br>Auditorium<br>Status: Occupied<br>2. If no parcel assign to locker<br>Locker ID: MMUCLOC008<br>Locker Location: MMU Student Center -<br>Auditorium<br>Status: Available<br>3. If the locker is under maintenance<br>Locker ID: MMUCLOC008<br>Locker Location: MMU Student Center -<br>Auditorium<br>Status: Under Maintenance|



_**Page 100**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **6.2.3 Student / Staff** 

## **6.2.3.1 Register** 

This test data is used to verify that the Student or Staff can register a new account to the system by entering the required information. 

|Use case|Screen|Test data|
|---|---|---|
|Register|Register screen|**User email:**junyuan@mmu.edu.my<br>**Password:**password123<br>**Confirmed Password:**password123<br>**Contact Number:**012345678<br>**Roles:**Student<br>**University:**Multimedia University Cyberjaya (MMU)|



## **6.2.3.2 Login** 

This test data is used to verify that the Student or Staff can login to the system by entering user email and password. 

|Use case|Screen|Test data|
|---|---|---|
|Login|Login screen|**User email:**rajesh.kumar@mmu.edu.my<br>**Password:**password123|



_**Page 101**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **6.2.3.3 Receive Parcel** 

This test data is used to verify that the Student or Staff can be notified when the parcel has already arrived and assigned into the locker. 

|arrived and assigned|into the locker.||
|---|---|---|
|Use case|Screen|Test data|
|Receive Parcel|Receive Parcel<br>Screen|-After the parcel manager assign Locker ID for<br>receiver<br>**Display**<br>**Parcel ID:**PAR46238900<br>**Locker ID:**MMUMLOC001<br>**Locker Location:**Block A - Entrance<br>**OTP:**766780<br>**Action:**Confirm Delivery|



## **6.2.3.4 Track Parcel** 

This test data is used to verify that the Student or Staff can track the parcel status through the parcel ID. 

|ID.|||
|---|---|---|
|Use case|Screen|Test data|
|Track Parcel|Track Parcel Screen|**Parcel ID:**PAR46238900|



## **6.2.3.5 Provide Feedback** 

This test data is used to verify that the Student or Staff can provide feedback to the admin. 

|Use case|Screen|Test data|
|---|---|---|
|Provide Feedback|Provide Feedback Screen|**Feedback Type:**Complaint<br>**Message:**The lockers are not enough.|



_**Page 102**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **6.2.3.6 Send Parcel** 

This test data is used to verify that the Student or Staff can track the parcel status through the parcel ID. 

|ID.|||
|---|---|---|
|Use case|Screen|Test data|
|Send Parcel|Send Parcel<br>Screen|**Receiver's University:**Multimedia University Melaka (MMU)<br>**Receiver's Name:**Omar bin Hussein|



## **6.2.3.7 Report Locker Issue** 

This test data is used to verify that the Student or Staff can track the parcel status through the parcel ID. 

|ID.|||
|---|---|---|
|Use case|Screen|Test data|
|Report Locker<br>Issue|Report Locker Issue<br>Screen|**Locker Number:**UMLOC001<br>**Issue Type:**Mechanical Issue|



_**Page 103**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **6.2.4 Courier** 

## **6.2.4.1 Courier Login** 

This test data is used to verify that the Courier can login to the system by entering user email and password. 

|password.|||
|---|---|---|
|Use case|Screen|Test data|
|Login|Login screen|**User email:**daniel.chan@trackiq.com<br>**Password:**password123|



## **6.2.4.2 Collect Outgoing Parcel** 

This test data is used to verify that the Courier can receive notification from the parcel manager in the system and collect parcels that are ready to be picked up. 

Use case Screen Test data 

_**Page 104**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

|Collect Outgoing<br>Parcel||Notification screen|-<br>Receive notification from parcel<br>manager<br>Notification received:<br>To: daniel.chan@trackiq.com<br>Subject: Pickup your parcels<br>Description: Your parcels for Delivery ID<br>DEL39661665 are ready to pick up.<br>From: wentao.woon@trackiq.com,<br>2025-02-11   18:54:22||
|---|---|---|---|---|
|||Collect Parcel Screen|**Parcel ID:**PAR15304680<br>**Sender:**Nurul Huda binti Ismail<br>**Recipient:**Omar bin Hussein<br>**Destination:**Multimedia University Melaka<br>(MMU)<br>**Status:**Ready to Pickup<br>**Parcel ID:**PAR23653932<br>**Sender:**Chong Mei Ling<br>**Recipient:**Liyana binti Karim<br>**Destination:**Multimedia University Melaka<br>(MMU)<br>**Status:**Ready to Pickup<br>**Parcel ID:**PAR47384738<br>**Sender:**Chong Mei Ling<br>**Recipient:**Liyana binti Karim<br>**Destination:**Multimedia University Melaka<br>(MMU)<br>**Status:**Ready to Pickup<br>Mark collected, status after:<br>**Parcel ID:**PAR15304680||



_**Page 105**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

**Sender:** Nurul Huda binti Ismail **Recipient:** Omar bin Hussein **Destination:** Multimedia University Melaka (MMU) **Status:** Parcel Collected **Parcel ID:** PAR23653932 **Sender:** Chong Mei Ling **Recipient:** Liyana binti Karim **Destination:** Multimedia University Melaka (MMU) **Status:** Parcel Collected **Parcel ID:** PAR47384738 **Sender:** Chong Mei Ling **Recipient:** Liyana binti Karim **Destination:** Multimedia University Melaka (MMU) **Status:** Parcel Collected 

## **6.2.4.3 Deliver Parcel to University** 

This test data is used to verify that the Courier can manage collected parcels status, view the parcel manager list to get destination parcel manager email, send notification to notify destination manager to collect delivered parcels. 

Use case Screen Test data 

_**Page 106**_ 

|**_Software Requirements Specifcation for University Parcel Management System (Version 3.0)_**|**_Software Requirements Specifcation for University Parcel Management System (Version 3.0)_**|**_Software Requirements Specifcation for University Parcel Management System (Version 3.0)_**|**_Software Requirements Specifcation for University Parcel Management System (Version 3.0)_**|
|---|---|---|---|
|Deliver Parcel to<br>University|Manage Parcel Status<br>Screen|-<br>Manage Status only modifiable if the<br>parcel is collected. Reported parcels<br>will not be able to update status<br>**Parcel ID:**PAR23653932<br>**Sender:**Chong Mei Ling<br>**Recipient:**Liyana binti Karim<br>**Destination:**Multimedia University Melaka<br>(MMU)<br>**Current Status:**Parcel Collected<br>Manage Status, status after:<br>**1): Manage Status**: Parcel Outgoing<br>**2): Manage Status:**In transit<br>**3): Manage Status:**Parcel Arrived at<br>University||



_**Page 107**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

|||View Parcel Manager<br>Screen|-<br>View Parcel Manager list,can “View<br>Details” such as email, phone<br>number, etc for that parcel.<br>Parcel ID:PAR23653932<br>Origin Manager ID:MGR71800924<br>Origin Manager:Woon Wen Tao<br>Destination Manager ID: MGR92047529<br>Destination Manager: Kelly Lim<br>Actions: View Details<br>View Details:<br>**Origin Manager:**<br>Manager ID: MGR71800924<br>Name: Woon Wen Tao<br>Email: wentao.woon@trackiq.com<br>Contact: +603-8312-5400<br>Work Branch: MMUC<br>**Destination Manager:**<br>Manager ID: MGR92047529<br>Name: Kelly Lim<br>Email: kelly.lim@trackiq.com<br>Contact: +606-252-3000<br>Work Branch: MMUM||
|---|---|---|---|---|
|||Notification Screen|-<br>Notify Destination Parcel Manager<br>using email when arrived at<br>University<br>Notification sent:<br>Recipient email: kelly.lim@trackiq.com<br>Title: Parcel Arrived at MMU, Melaka<br>Message: Parcels under delivery ID<br>DEL14829253 are ready to be collected.||



_**Page 108**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

||Manage Parcel Status<br>Screen|-<br>Back to this page, update parcel<br>status to the last status<br>**Parcel ID:**PAR23653932<br>**Sender:**Chong Mei Ling<br>**Recipient:**Liyana binti Karim<br>**Destination:**Multimedia University Melaka<br>(MMU)<br>**Manage Status:**Parcel Handed Over to<br>Parcel Manager|
|---|---|---|



_**Page 109**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **6.2.4.4 Report Delivery Issue** 

|Use case||Screen|Test data|
|---|---|---|---|
|Report Delivery<br>Issue||Report Delivery Issue<br>Screen|-<br>Enter Parcel ID, select the issue type<br>and enter issue description to submit<br>a report.<br>-<br>Every reported issue will send an<br>automated message to involved<br>parties, such as parcel managers,<br>sender and recipient<br>**Parcel ID**: PAR15304680<br>**Issue Type**: Lost Parcel<br>**Issue Description**: The delivery van<br>involved in a serious accident and the parcel<br>reported is missing.<br>-<br>Submit report.|
|||View Reported History<br>Screen|-<br>All reported parcels can be viewed.<br>Click "View Reported History" from<br>Report Delivery Issue Screen to see<br>the full list.<br>Parcel ID: PAR15304680<br>Reported title: Reported - Lost Parcel<br>Parcel Destination: Multimedia University<br>Melaka (MMU), Bukit Beruang, Melaka,<br>Malaysia<br>Reported At: 2025-02-12 13:41:01.943271|



_**Page 110**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **6.3 Acceptance Testing** 

## **6.3.1 Admin** 

|Criteria|Fulfilled|Remarks|
|---|---|---|
|**Login**<br>Users should be able to enter<br>their email and password and<br>access the system.|Yes||
|**Generate report**<br>User should be able to generate<br>monthly summary report  for<br>this University Parcel<br>Management system|Yes||
|**Manage User**<br>Users should be able to update<br>or delete student and staff<br>and add parcel manager and<br>courier to information the<br>database|Yes||
|**Respond FeedBack**<br>Users should be able to view<br>and respond to student and staff<br>feedback|Yes||



_Date tested : 12/02/2025 % Complete : 100% Tested by : Teo Hock Seng Verified by : Teo Hock Seng_ 

_**Page 111**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **6.3.2 Parcel Manager** 

|**Criteria**|**Fulfilled**|**Remarks**|
|---|---|---|
|**Login**<br>User must log in using<br>their email address<br>and password to<br>access the system|Yes||
|**Organize Parcel**<br>Users can select the<br>parcels, date, and<br>courier to group all the<br>parcels together|Yes||
|**Log Arrival Parcel**<br>Users can update the<br>parcel status such as<br>“Verified - Collected”,<br>“Verified - Missing”<br>and “Verified -<br>Damaged” to let the<br>courier know after<br>checking the parcel.|Yes||
|**Update Parcel Status**<br>Users can update the<br>checked parcel status<br>to “Arrived” to notify<br>students of staff by<br>marking the parcels as<br>collected|Yes||
|**Assign Parcel to**<br>**Locker**<br>Users can select the<br>parcel and choose the<br>locker to assign it. If<br>all the locker is<br>occupied, then users<br>can assign it to the<br>waitlist.|Yes||
|**Monitor Locker**<br>**Issue**|Yes||



_**Page 112**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

Users can filter the locker by searching with the alphabet or number to check the locker status and update the locker status as “Available”, “Occupied” and “Under Maintainance” 

_Date tested : 12/2/2025 % Complete : 100% Tested by :Woon Wen Tao Verified by :Woon Wen Tao_ 

_**Page 113**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **6.3.3 Student/Staff** 

|Criteria|Fulfilled|Remarks|
|---|---|---|
|**Register**<br>Users should be able<br>to register their<br>account by<br>providing required<br>information.|Yes||
|**Login**<br>Users should be able<br>to enter their email<br>and password and<br>access the system.|Yes||
|**Receive Parcel**<br>Upon the parcel<br>manager assigning<br>the locker to the<br>arrived parcel, the<br>receiver will receive<br>the specific locker<br>OTP and locker<br>location.|Yes||
|**Track Parcel**<br>Users should be able<br>to enter the parcel<br>ID to track their<br>parcel current status.|Yes||
|**Provide Feedback**<br>Users should be able<br>to submit feedback<br>about the system to<br>the admin.|Yes||



_**Page 114**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

Yes **Send Parcel** Users should be able to enter the registered user’s name and the university to send the parcel. Yes **Report Locker Issue** Users should be able to submit the report to parcel manager 

_Date tested : 12/2/2025 % Complete : 100% Tested by : Phang Jun Yuan Verified by : Phang Jun Yuan_ 

_**Page 115**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **6.3.4 Courier** 

|Criteria|Fulfilled|Remarks|
|---|---|---|
|**Login**<br>Users should be able to enter<br>their email and password and<br>access the system.|Yes||
|**Collect Outgoing Parcel**<br>Couriers should be able to<br>update parcel status to "Parcel<br>Collected" by marking parcels<br>as collected.|Yes||
|**Deliver Parcel to University**<br>Couriers should be able to<br>manage parcel status by<br>updating status sequentially<br>based on his delivery process.|Yes||
|**Report Delivery Issue**<br>Couriers should be able to<br>report parcel issues if any<br>problems occur during<br>delivery.|Yes||



_Date tested : 12/2/2025 % Complete : 100% Tested by : Chan Zheng Uee Verified by :Chan Zheng Uee_ 

_**Page 116**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **7 Sam le Screens p** 

## **7.1 Main Screen** 

## **7.1.1 Admin** 

**Login Screen:** 

This is the login screen for the admin. Each user role, including the admin, has a designated login route. Upon successful login, users are redirected to their respective dashboards based on their roles. 

_**Page 117**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **Admin Dashboard:** 

The Admin Dashboard provides a quick overview of key activities. It welcomes the admin by name and displays recent user feedback notifications. Parcel status statistics, including received, delivered, and pending parcels, are shown for easy tracking. Additionally, it highlights the number of unresolved feedback, ensuring efficient management of user concerns. 

_**Page 118**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **Generate Report:** 

The Generate Report feature enables users to create customized reports by selecting the desired report type, such as a Monthly Summary. Users can specify the month, for example, January, and the year, such as 2024, to tailor the report to their needs. After setting these parameters, the system processes the data and generates a comprehensive report. 

_**Page 119**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **Manage User:** 

The interface provides a user management system where administrators can add or search for users by User ID or Name. It displays a list of users with details such as User ID, Name, Email, User Type (e.g., Student, Teacher, Admin), and Status (Active/Inactive). Each user entry includes options to Update or Delete their profile, enabling efficient user management and profile maintenance. 

_**Page 120**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

_**Page 121**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **Respond Feedback:** 

The interface allows administrators to view a list of user feedback. Each feedback entry has a button labeled as "Respond," which administrators can select to respond to the specific feedback. This setup enables administrators to efficiently review and address user feedback, ensuring timely and appropriate responses to enhance user satisfaction and service quality. 

_**Page 122**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **7.1.2 Parcel Manager** 

## **Parcel Manager Login Screen** 

When executing the system, the first page is parcel manager login screen to allow parcel manager login the system. After successful login, it will navigate to parcel manager dashboard. 

_**Page 123**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **Parcel Manager Dashboard Screen** 

The parcel manager dashboard is the home screen for the parcel manager. As we can see the navigation bar on the above navigates other functions. The dashboard is separated into 4 parts which is the first part is welcoming the current parcel manager, the second part is the notification from the courier and student or staff, and the third part is checking the parcel status which is received, delivered and pending, and the last part is checking the locker status to see either the locker is “Available” or “Occupied”. 

_**Page 124**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **Parcel Manager Organize Parcel Screen** 

When the user wants to deliver the parcel, we as the parcel manager can see the parcel from the parcel list and select the parcel together. After choosing a date and courier, we can group all the parcels to deliver out. The grouped parcel will generate a unique Delivery ID show at below. After clicking the group selected parcel, these groups of parcels will be sent to the courier. 

## **Parcel Manager Update Parcel Status Screen** 

After log arrival of the parcel, the parcel manager should update the parcel status to the student or staff to let them know the parcel has arrived at the campus. The parcel will be set as “Arrived” in the parcel status list. 

_**Page 125**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **Parcel Manager Assign Parcel to Courier Screen** 

The last flow of parcel manager after receiving the parcels from the courier. The Parcel Manager can select the parcel and choose the locker where the locker must be “Available”. If all the lockers are “Occupied”, then the parcel manager can select the parcels and add them into the waitlist. 

## **Parcel Manager Monitor Locker Screen** 

To check the locker for availability, the Monitor Locker Screen will show all the lockers. To be easier, the parcel manager can search the related word or number for Locker ID, then it will filter up all the related lockers. Also, parcel manager can manually update the locker status to the database. 

_**Page 126**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **Parcel Manager Log Arrival Parcel Screen** 

When the parcel is delivered to the campus by courier, the parcel manager will check the parcel’s details physically. If the parcel doesn’t have any problem, then the parcel manager can set the status as “Verified - Collected”, else they can set it as “Verified - Missing” or “Verified - Damage”. 

## **Parcel Manager Notifications Screen** 

The notifications screen is to send and receive the notification from the courier and student or staff. The notifications will appear in the left container and the right container will send a notification. After receiving the notifications, the parcel manager can reply to the messages to the sender. To avoid too long messages, the message box is set to a limit which is only 150 characters. 

_**Page 127**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **7.1.3 Student/Staff** 

## **Register screen:** 

The Register Screen allows new users to create an account by filling in personal details such as name, email, contact number, and university affiliation, along with setting up login credentials (username and password). It includes validation to ensure data accuracy (e.g., valid email format, secure password) and provides a confirmation message upon successful registration, redirecting users to the Login Screen. This ensures a smooth onboarding process, enabling users to quickly access the system and its features. 

**Login screen:** 

_**Page 128**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

The Login Screen is the entry point for users to access the system. It requires users to log in with their credentials. After successful authentication, users are redirected to their personalized Dashboard Screen, where they can view their activities and manage their parcels. 

## **User Dashboard Screen:** 

The Dashboard Screen provides users with an overview of their parcel-related activities, displaying key information such as the total number of parcels sent and received, the number of pending parcels, notifications, and feedback status. Serving as a central hub, this screen keeps users informed about their parcel transactions and system updates. 

## **Receive Parcel Screen:** 

_**Page 129**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

The Receive Parcel Screen allows users to manage and collect their assigned parcels by displaying a list of parcels ready for collection, including details such as parcel ID, locker ID, locker location, and a one-time password (OTP) for access. It also provides an option to mark parcels as delivered once collected, ensuring efficient retrieval and system updates. 

## **Send Parcel Screen:** 

The Send Parcel Screen enables users to send parcels by providing a form to input recipient details and select the recipient’s university. It also displays all the sent parcels. This screen streamlines the sending process and ensures proper tracking from the start. 

**Notification Screen:** 

_**Page 130**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

The Notification Screen displays messages and updates relevant to the user, showing notifications with details. 

## **Report Locker Issue Screen:** 

The Report Locker Issue Screen allows users to report locker problems by providing a form to select the locker number, specify the issue type, and describe the problem. It also confirms issue submission and maintains a record of reported issues, ensuring quick reporting and resolution of locker-related problems. 

**Feedback Screen:** 

_**Page 131**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

The Feedback Screen allows users to submit feedback or report issues through a form where they can input feedback content and select the feedback type. It also displays a list of previously submitted feedback and their status, encouraging user engagement and contributing to system improvement. 

## **Track Parcel Screen:** 

The Track Parcel Screen enables users to monitor their parcel status through a search function that retrieves the current status using the parcel ID. It also displays a detailed history of status updates, ensuring transparency and real-time tracking of parcel delivery progress. 

_**Page 132**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **7.1.4 Courier** 

## **Login Screen:** 

Upon starting the system, the first screen that will show up is the login screen, where each actor will have a designated route for logging in. Depending on the role, successful login will redirect the user to their respective main page. For the current actor, logging in as a courier will lead me to the courier's main page. 

_**Page 133**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **Courier DashBoard Screen:** 

The Courier Dashboard serves as the home screen for couriers, providing an overview of their activities and status. It displays a welcome message with the courier's name, giving a personalized touch to the interface. The dashboard includes a delivery record section, which shows details about the last destination, the number of parcels collected, and any reported issues. Additionally, there is a notifications panel that provides updates on messages sent and received. The delivery activity section highlights ongoing and upcoming tasks, helping couriers stay informed about their schedules. At the top of the screen, a navigation bar allows quick access to essential features such as parcel collection, status updates, notifications, and issue reporting. This interface is designed to help couriers efficiently manage their deliveries and stay organised. 

_**Page 134**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **Collect Parcel Screen:** 

The "Collect Parcel" screen allows couriers to manage and track parcel collections. It features a search function where users can input a date to filter deliveries. Below, a delivery list is displayed, showing details of parcels assigned to the courier. Each parcel entry includes relevant information such as sender, recipient, destination, and status. Couriers can mark parcels as collected by selecting checkboxes next to each item. A "Done" button is provided to confirm the collection. Additionally, a "View Parcel Manager" button at the bottom allows users to view the parcel manager list and manager details. This interface helps couriers efficiently manage their parcel collection process. 

_**Page 135**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **View Parcel Manager Screen:** 

The Parcel Manager List screen provides an overview of parcel assignments, showing which managers are responsible for handling specific parcels at both the origin and destination points. It includes key details such as the Parcel ID, Origin Manager ID and Name, and Destination Manager ID and Name. This page is useful for couriers, as it allows them to quickly identify and contact the assigned parcel managers if needed. Each entry includes a "View Details" button, which provides additional contact information such as email and phone number. This ensures smooth communication between couriers and managers for tracking, updates, or resolving any parcel-related issues. A Back button is also available for returning to the "Collect Parcel" screen. 

_**Page 136**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **Manage Parcel Status Screen:** 

The Manage Parcel Status screen allows couriers to update the delivery status of parcels. It displays key details such as Parcel ID, Sender Name, Recipient, Destination, and Current Status of each parcel. Couriers can manage the parcel status using a dropdown menu under the "Manage Status" column, selecting the appropriate status update (e.g., "Parcel Outgoing"). Once a new status is selected, they can confirm the change by clicking the "Update" button. This page helps in tracking parcel progress, ensuring up-to-date status updates, and maintaining an organized delivery workflow. 

_**Page 137**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **Notification Screen:** 

The Notifications Page consists of two main sections. The Received Notifications panel displays messages received by the courier, including the sender’s email, timestamp, and message content. When a message is clicked, the system provides a reply functionality, allowing the courier to respond directly. The Send Notification panel enables the courier to compose and send a new notification by entering the recipient's email and message title before clicking the "Send" button to submit the notification. 

_**Page 138**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **Report Delivery Issue Screen:** 

The "Report Delivery Issue" screen allows users to report problems related to parcel deliveries. Users can enter the parcel ID to specify which parcel has an issue and select the type of issue from four options: damaged parcel, lost parcel, delayed delivery, or other. Additionally, they can provide further details about the issue in the description textbox. Once all necessary information is entered, they can submit the report using the submit button. There is also an option to view reported history, which allows users to review previously reported issues. 

_**Page 139**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **View Reported History Screen:** 

The "View Reported History" screen displays a list of previously reported parcel issues. Users can see details such as the parcel ID, the type of issue reported, the parcel's destination, and the date and time when the issue was reported. There is also a back button that allows users to return to the previous page. 

_**Page 140**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **8 Conclusion** 

## **8.1 Completion of Software** 

We have successfully implemented all the required features to facilitate parcel management within the university. This includes functionalities for delivering, sending, receiving, and tracking parcels, as well as authentication and role-based access control for admin,student/staff, parcel managers and couriers. Additionally, the system provides status updates and reports to improve efficiency in parcel handling. 

## **8.2 Software Quality Assurance** 

Each module was continuously tested during development to verify that it functioned correctly in terms of user interaction, data processing, and up-to-date status updates. Given that the parcel management system requires frequent status changes (e.g., parcel arrival, pickup, and delivery updates), testing was conducted step by step to ensure data consistency and smooth transitions between different states. Specifically, we ensured that: 

- User-entered data was accurately stored in the database. 

- Data retrieval operations were efficient and error-free, even as parcel statuses changed. 

- User authentication and role-based access controls worked as expected. 

- Status updates were reflected correctly across different user interfaces (e.g., parcel sender, recipient, courier, parcel manager and administrator views). 

After integrating all subsystems into the overall university parcel management system, we conducted system-wide testing to confirm that data stored  and status updates did not introduce unintended behavior or inconsistencies. 

Throughout the project, we maintained consistency in tools and documentation by using the Flask Framework, Flask-SQLAlchemy for database management, and Visual Studio Code as our development environment. Additionally, draw.io was used to create the diagrams illustrated in this report. 

## **8.3 Group Collaboration** 

We maintained strong collaboration by scheduling regular discussions to track our progress and troubleshoot issues together. Team members actively shared resources and knowledge, helping each other resolve any challenges that arose. This effective teamwork allowed us to deliver a fully functional program on time. 

_**Page 141**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **8.4 Problems encountered** 

As we were relatively new to the Flask Framework, we spent significant time learning its core functionalities, including routing, database management using Flask-SQLAlchemy, and handling user authentication. Initially, we faced difficulties in structuring our Flask application efficiently, leading to challenges in maintaining clean and modular code. 

Another major challenge was managing up-to-date updates and status tracking within the parcel management system. Since parcels go through multiple status changes (e.g., pending, in transit, delivered), we had to ensure that data updates were correctly reflected in the database and across different user views without inconsistencies. 

Additionally, our limited experience with front-end technologies such as **HTML, CSS, and JavaScript** posed difficulties in designing an intuitive and user-friendly interface. Implementing interactive features, such as dynamic status updates and responsive design, required us to learn and apply new front-end development concepts alongside our backend work. 

Despite these challenges, we actively sought solutions by referring to online resources, documentation, and tutorials. We also collaborated closely as a team to troubleshoot errors and refine our implementation. These learning experiences ultimately strengthened our understanding of both backend and frontend development. 

_**Page 142**_ 

_**Software Requirements Specification for University Parcel Management System (Version 3.0)**_ 

## **9 User Guide** 

## **To execute the program: Python flask installation is necessary! Flask installation guide:** 

1. Open terminal 

2. Type the command **python3 –version** 

3. Make sure your **python version is 3.8** and above 

4. Type the command **pip install Flask** 

## **Please follow the instruction below:** 

1. Unzip the folder 

2. Open the Terminal and navigate to the folder that unzip 

3. Type the command **python main.py** 

4. Click the link **http://127.0.0.1:5000** as shown in the terminal 

5. If you login as **Student** or **Staff** , type the email address and password directly. 

6. If you login as **Parcel Manager,** go to the link below: 

   - **http://127.0.0.1:5000/parcel-manager/parcel-manager-login** 

7.  If you login as **Courier** , go to the link below: 

   - **http://127.0.0.1:5000/courier/courier-login** 

8.  If you login as **Admin** , go to the link below: 

   - **http://127.0.0.1:5000/admin/admin-login** 

9. Login using your own email address and password for each role as shown below: 

|**Role**|**Username**|
|---|---|
|Admin|Email: john.doe@gmail.com<br>Password: JohnDOE@12345|
|Parcel Manager|Email: wentao.woon@trackiq.com<br>Password: password123|
|Student / Staff|Email: tan.weiling@mmu.edu.my<br>Password: password123|
|Courier|Email: daniel.chan@trackiq.com<br>Password: password123|



_**Page 143**_ 

