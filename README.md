# CV Builder

Here are my main components:

CV
  Header
    On state: name, email, phone
  Education
    On state: degrees (array of objects)
    Degree...
    AddEducationForm
  Work Experience
    On state: jobs (array of objects)
    Job...
    AddWorkForm

Degree objects {
  school
  degree
  startDate
  endDate?
}

Job objects {
  company
  position
  responsibilities[]
  startDate
  endDate
}