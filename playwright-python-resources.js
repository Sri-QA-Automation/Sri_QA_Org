// Edit this file to update notes, assignments, materials and interview questions.
const NOTES = [
["Python basics","Variables, data types, list/dict/set/tuple, f-strings, loops, functions, classes, file handling, exceptions, virtual env (venv), pip."],
["Playwright setup","pip install pytest-playwright, then playwright install. Sync API for tests. Browser > BrowserContext > Page is the core hierarchy."],
["Locators","Prefer get_by_role, get_by_label, get_by_text, get_by_test_id. Use CSS/XPath last. Chain and filter with locator.locator(), .filter(), .nth()."],
["Auto-wait & assertions","Actions wait for visible, stable, enabled. Use expect(locator).to_be_visible() style web-first assertions; they retry. Avoid time.sleep."],
["Pytest essentials","Fixtures, scope, conftest.py, parametrize, markers, -k/-m, --html reports, pytest.ini, xdist (-n) for parallel runs."],
["Page Object Model","One class per page, locators in __init__, actions as methods, no assertions inside pages (or keep them minimal). Fixtures create page objects."],
["API testing","page.request / playwright.request.new_context(). GET/POST/PUT/DELETE, headers, auth tokens, JSON assertions, mixing API setup with UI checks."],
["Data handling","Read JSON, CSV, Excel (openpyxl), .env (python-dotenv). Never hard-code credentials. Drive tests with parametrize."],
["Debugging & reports","Trace viewer, screenshots on failure, video, codegen, PWDEBUG=1, pytest-html and Allure reports."],
["CI/CD","GitHub Actions: checkout, setup-python, pip install, playwright install --with-deps, run pytest, upload report artifacts, schedule with cron."],
["AI & MCP","Playwright MCP lets an AI agent drive the browser. Use AI to draft tests, then review them. Basic LLM evaluation with DeepEval and Ollama."]
];
const ASSIGN = [
["Python","Write a function that reads a CSV of users and returns a dict of username to password. Handle a missing file with try/except."],
["Setup","Install Playwright, launch Chromium, Firefox and WebKit, open a site and print the page title in each."],
["Browser/Page","Open two tabs, switch between them and verify both titles. Handle a popup window."],
["Frames","Automate a page with an iframe: type in the frame and verify the text outside it."],
["Locators","Locate 10 elements on a demo site using 5 different locator types. Explain why each is stable."],
["Dynamic UI","Automate a dynamic table: find a row by text, click its Edit button, verify the value changed."],
["Controls","Handle dropdown, checkbox, radio, date picker, file upload and file download on one test page."],
["Pytest","Convert Assignment 6 into pytest tests with a fixture, 3 parametrized datasets and a marker."],
["Login flow","Automate login with valid, invalid and empty credentials using data from a JSON file."],
["POM","Rebuild the login and dashboard flow using Page Object Model, with a conftest.py fixture."],
["API","Test a public REST API (GET, POST, PUT, DELETE). Validate status code, schema keys and response time."],
["UI + API","Create data using an API call, then verify it appears in the UI."],
["Network","Mock an API response with page.route() and verify the UI shows the mocked data."],
["Reports","Generate an HTML report, with a screenshot and a trace attached on failure."],
["Parallel","Run your suite in parallel with pytest-xdist and fix any tests that are not independent."],
["CI/CD","Create a GitHub Actions workflow that runs your suite on every push and uploads the report."],
["Mini project","Build a mini framework (POM, config, data files, reports, CI) for an e-commerce demo site and push to GitHub."],
["AI","Use Playwright MCP to generate a test from a plain-English scenario. Review and fix the generated code."]
];
const MATERIAL = [
["Course slides","Playwright_with_Python_ppt.pptx","Slides used in class. Upload the file to the site folder and link it here."],
["Class recordings","YouTube playlist","See the Class Videos section on the course page."],
["Official docs","playwright.dev/python","Primary reference for the API."],
["Pytest docs","docs.pytest.org","Fixtures, parametrize and markers."],
["Practice sites","saucedemo.com, the-internet.herokuapp.com, demoqa.com","Safe sites for assignments."],
["Practice APIs","reqres.in, jsonplaceholder.typicode.com","For API assignments."]
];
// Each item: "Question|Answer"
const QA = {
"Python":[
"What are Python's mutable and immutable types?|Mutable: list, dict, set. Immutable: int, str, tuple, frozenset.",
"List vs tuple?|List is mutable and slower; tuple is immutable and can be a dict key.",
"What is a decorator?|A function that wraps another function to add behaviour, used with @name.",
"What is *args and **kwargs?|Variable positional arguments as a tuple, and keyword arguments as a dict.",
"What is a virtual environment and why use it?|An isolated Python install per project so dependency versions don't clash.",
"How do you handle exceptions?|try/except/else/finally. Catch specific exceptions, not bare except.",
"What is a generator?|A function using yield that produces values lazily, saving memory.",
"Explain list comprehension.|A short form to build lists: [x*2 for x in nums if x>0].",
"What is the with statement?|A context manager that guarantees cleanup, such as closing a file.",
"How do you read a JSON file?|with open('f.json') as f: data = json.load(f)."],
"Playwright basics":[
"What is Playwright?|An open-source tool by Microsoft for reliable cross-browser end-to-end automation.",
"Which browsers does it support?|Chromium, Firefox and WebKit, headed or headless.",
"Playwright vs Selenium?|Playwright has auto-waiting, one API for all browsers, built-in tracing, and is faster; Selenium has a larger legacy ecosystem.",
"Sync vs async API?|Sync suits pytest and simple scripts; async suits asyncio-based code.",
"Browser, Context, Page?|Browser is the process; a Context is an isolated session (cookies, storage); a Page is a tab.",
"Why use multiple contexts?|Cheap isolation between tests or users without launching a new browser.",
"How do you run headed?|launch(headless=False) or pytest --headed.",
"What is codegen?|playwright codegen url records actions and generates code.",
"How do you take a screenshot?|page.screenshot(path='a.png', full_page=True).",
"How do you handle multiple tabs?|with context.expect_page() as p: click; new_page = p.value.",
"How do you handle iframes?|page.frame_locator('#id').get_by_role(...).",
"How do you handle alerts?|page.on('dialog', lambda d: d.accept()) before the action.",
"How do you upload a file?|locator.set_input_files('path').",
"How do you download a file?|with page.expect_download() as d: click; d.value.save_as(path).",
"How do you set viewport or device?|browser.new_context(**p.devices['iPhone 13'])."],
"Locators and waits":[
"Recommended locator order?|get_by_role, get_by_label, get_by_test_id, get_by_text, then CSS, then XPath.",
"What is a locator?|A lazy, auto-retrying description of how to find an element; resolved at action time.",
"Locator vs element handle?|Locators re-query each time and are not stale; handles can go stale. Prefer locators.",
"How do you pick the nth element?|locator.nth(2), .first, .last.",
"How do you filter locators?|locator.filter(has_text='x') or filter(has=other_locator).",
"How do you handle dynamic IDs?|Use role, text, partial attribute selectors like [id^='abc'], or test ids.",
"What is auto-waiting?|Before an action Playwright checks visible, stable, enabled, receives events.",
"Why avoid time.sleep?|It is slow and flaky; use auto-wait and expect assertions.",
"How do you wait for a network call?|with page.expect_response('**/api/**') as r: action.",
"When is wait_for_selector used?|Rarely; prefer expect(locator).to_be_visible(). Use for explicit state like 'hidden'.",
"How do you check if an element exists?|expect(loc).to_have_count(0) or loc.count() for a quick check.",
"How do you hover or right-click?|loc.hover(); loc.click(button='right').",
"How do you handle dropdowns?|select_option(value/label) for select tags; click options for custom ones.",
"What does force=True do?|Skips actionability checks. Use sparingly; it can hide real bugs.",
"How do you get text and attributes?|loc.inner_text(), loc.text_content(), loc.get_attribute('href').",
"What is strict mode?|A locator matching more than one element throws an error on actions."],
"Pytest":[
"What is a fixture?|Reusable setup/teardown injected by name into tests.",
"Fixture scopes?|function, class, module, package, session.",
"What is conftest.py?|Shared fixtures and hooks, discovered automatically without imports.",
"What is parametrize?|@pytest.mark.parametrize runs one test with many data sets.",
"What are markers?|Tags like @pytest.mark.smoke, run with -m smoke. Register them in pytest.ini.",
"How do you skip or expect failure?|@pytest.mark.skip, skipif, xfail.",
"How do you run one test?|pytest file.py::test_name or -k 'login'.",
"What does yield do in a fixture?|Code after yield is teardown.",
"What is pytest.ini?|Config file for markers, options, testpaths, addopts.",
"How do you run in parallel?|pytest-xdist: pytest -n 4.",
"How do you retry flaky tests?|pytest-rerunfailures: --reruns 2. Fix root cause first.",
"What is pytest-playwright?|Plugin giving page, context, browser fixtures and CLI options.",
"How do you pick a browser in pytest?|--browser firefox, repeatable for multiple browsers.",
"How do you override a built-in fixture?|Redefine it in conftest.py, e.g. browser_context_args.",
"How do you capture failure screenshots?|--screenshot only-on-failure, or a pytest hook using item.rep_call."],
"Framework and POM":[
"What is Page Object Model?|Each page is a class holding locators and actions, which reduces duplication.",
"Benefits of POM?|Maintainability, reuse, readable tests, one place to fix locator changes.",
"Should page objects contain assertions?|Keep them in tests, mostly; pages expose state and actions.",
"How do you pass the page to a page object?|Through the constructor: LoginPage(page).",
"How do you manage config?|Config file or .env per environment, read via a fixture.",
"How do you keep test data?|JSON/CSV/Excel files loaded by fixtures or parametrize.",
"How do you store credentials safely?|Environment variables and CI secrets, never in the repo.",
"How do you reuse login across tests?|Save storage_state once, load it in new contexts.",
"Typical framework folder layout?|pages/, tests/, data/, utils/, conftest.py, pytest.ini, requirements.txt.",
"How do you log in framework runs?|Python logging module with a file handler configured in conftest."],
"API, reports and CI/CD":[
"How do you call APIs in Playwright?|playwright.request.new_context() or page.request.get/post.",
"How do you send auth headers?|Pass extra_http_headers when creating the request context.",
"How do you validate a JSON response?|assert resp.ok; body = resp.json(); assert body['id'] == 1.",
"How do you mock an API?|page.route('**/api/x', lambda r: r.fulfill(json={...})).",
"Why combine UI and API tests?|API for fast setup/teardown, UI for the flow under test.",
"What is the trace viewer?|A recording of actions, DOM snapshots and network; open with playwright show-trace.",
"Which reports do you use?|pytest-html for simple, Allure for rich reports with history.",
"Outline a GitHub Actions workflow.|Checkout, setup-python, pip install, playwright install --with-deps, pytest, upload-artifact.",
"How do you run nightly?|on: schedule with a cron expression.",
"How do you run against several browsers in CI?|A matrix strategy on browser name."],
"AI, MCP and scenarios":[
"What is Playwright MCP?|A Model Context Protocol server that lets AI agents control a browser through Playwright.",
"How can AI help automation testers?|Draft tests, suggest locators, generate data, summarise failures. Always review the output.",
"What is DeepEval?|A framework to evaluate LLM outputs with metrics such as relevancy and hallucination.",
"What is Ollama used for?|Running LLMs locally, useful for private evaluation and testing.",
"A test passes locally but fails in CI. What do you check?|Headless differences, viewport, timing, test data, env variables, and the trace artifact.",
"A test is flaky. How do you fix it?|Find the race: replace sleeps with web-first assertions, isolate data, check the trace, then consider retries."]
};
QA["Python"].push(
"What is __init__ ?|The constructor that runs when an object is created.",
"What is the difference between is and ==?|is compares identity; == compares value.",
"What is a lambda?|A small anonymous one-line function.",
"How do you read environment variables?|os.getenv('KEY') or python-dotenv's load_dotenv().");
QA["Playwright basics"].push(
"How do you record video?|Pass record_video_dir when creating the context.",
"How do you handle cookies?|context.cookies(), context.add_cookies([...]), or storage_state.",
"What is persistent context?|launch_persistent_context keeps a user profile on disk.",
"How do you emulate geolocation or locale?|new_context(geolocation=..., permissions=['geolocation'], locale='en-GB').");
QA["Pytest"].push(
"How do you share data between tests?|Prefer fixtures; avoid test order dependence.",
"What does -s and -v do?|-s shows print output; -v gives verbose results.",
"What is pytest.raises?|Context manager asserting that a block raises a given exception.");
QA["API, reports and CI/CD"].push(
"How do you handle API response time checks?|Measure with time.perf_counter around the call and assert a limit.",
"How do you upload reports in CI?|actions/upload-artifact with the report folder path.",
"How do you cache dependencies in CI?|actions/setup-python with cache: pip.");
QA["Framework and POM"].push(
"What is storage_state?|A saved JSON of cookies and local storage to reuse an authenticated session.",
"How do you handle test data cleanup?|Fixture teardown after yield, or API delete calls.");
QA["AI, MCP and scenarios"].push(
"What is a hallucination in LLM testing?|A confident answer that is not supported by facts or source context.",
"How would you test a chatbot UI with Playwright?|Send prompts, wait for the response element, assert key content, and use DeepEval for quality metrics.");
