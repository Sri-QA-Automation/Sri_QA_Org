// PUBLIC preview only. Full content lives in private Google Drive files shared view-only with approved emails.
const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // same number as script.js

// All buttons open the private members folder. To open one file directly instead, paste that file's Drive link here.
// One private Drive folder per section, each shared only with approved emails (Viewer).
const MEMBER_LINKS = {
  notes: "https://drive.google.com/drive/folders/1UB5ifRCJehXFQ7_Cv9aykwNPptHU-PX0",
  assignments: "https://drive.google.com/drive/folders/1WhqpKEEMRM3qb5dv-Xl6BeEQGKAb-EZC",
  interview: "https://drive.google.com/drive/folders/1OCvHm-bb3gtijTCsmICjqE3QeYpr3uD3",
  resume: "https://drive.google.com/drive/folders/1k-1HCUgmz2aJCXBPcUwEriaF2GAdghFq"
};


// To show a file on this page (no redirect to Drive), paste that file's Drive share link (or just its ID) here.
// Drive decides who can see it: only emails you added as Viewer. Others see "You need access" inside the frame.
const FILE_LINKS = {
  notes: "",       // Python_Study_Material_for_Test_Automation.pdf
  assignments: "", // Assignments_Members.pdf
  interview: "",   // Interview_Questions_100_Members.pdf
  resume: ""       // Sample_SDET_AI_Test_Automation_Resume.pdf
};

const TOTALS = { notes: 9, assignments: 39, interview: 100 };

const PYNOTES = [
["Data types and type casting","Primitive: int, float, complex, bool, str. Non-primitive: list, tuple, set, dict, range. Use type() to check. Casting converts types; a set removes duplicates."],
["Operators","Arithmetic, assignment, comparison, logical, identity and membership operators. / always gives a float, // floors, ** is power."]
];
const PYASSIGN = [
["Data types","Create one variable of every primitive type, print each value with its type(), and explain why '10' + '10' and 10 + 10 behave differently."],
["Type casting","Take a list with duplicate browser names, find the unique names using a set, then return a sorted list and print how many duplicates were removed."]
];
const NOTES = [
["Playwright setup","pip install pytest-playwright, then playwright install. Browser > BrowserContext > Page is the core hierarchy."],
["Locators","Prefer get_by_role, get_by_label, get_by_text, get_by_test_id. Use CSS/XPath last."]
];
const ASSIGN = [
["Setup","Install Playwright, launch Chromium, Firefox and WebKit, open a site and print the page title in each."],
["Browser/Page","Open two tabs, switch between them and verify both titles. Handle a popup window."]
];
const QA_PREVIEW = [
"What are primitive and non-primitive data types in Python?|Primitive: int, float, complex, bool, str. Non-primitive: list, tuple, set, dict, range.",
"What is type casting? Give an example.|Converting one type to another, e.g. set([1,1,2]) removes duplicates and list() converts it back.",
"Why must set items and dictionary keys be unchangeable?|They are stored using hashing, which needs a fixed value, so numbers, strings and tuples work but lists do not.",
"What is the difference between == and is?|== compares values; is checks whether both names point to the same object in memory.",
"What is Playwright?|An open-source tool by Microsoft for reliable cross-browser end-to-end automation."
];
const RESUME_PREVIEW = "Experienced Software Development Engineer in Test (SDET) with over 6 years of expertise in ensuring software quality through scalable test automation and modern AI-assisted engineering practices. Proficient in Playwright with Python, specializing in UI automation, REST API testing, database validation, and CI/CD integration.";
