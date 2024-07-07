import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiWeb, mdiEmailOutline, mdiCellphone } from '@mdi/js';

function App() {
  return (
    <>
      <Header />
      <main>
        <Education />
        <WorkExperience />
      </main>
    </>
  );
}

function Header() {
  const [person, setPerson] = useState(dummy);

  return (
    <header>
      <h1>{person.firstName} {person.lastName}</h1>
      <div>
        <p className="url">
          <span className="icon"><Icon path={mdiWeb} size={.8} /></span>
          <a href={person.url}>{person.url.split("/")[2]}</a></p>
        <p className="email">
          <span className="icon"><Icon path={mdiEmailOutline} size={.8} /></span>
          {person.email}
        </p>
        <p className="phone">
          <span className="icon"><Icon path={mdiCellphone} size={.8} /></span>
          {person.phone}
        </p>
      </div>
    </header>
  );
}

function Education() {
  const [degrees, setDegrees] = useState(dummyDegrees);

  return (
    <section className="education">
      <h2>Education</h2>
      {degrees.map(degree => <Degree key={degree.id} degree={degree} />)}
    </section>
  );
}

function Degree({ degree }) {
  return (
    <div className="education__degree">
      <h3>{degree.school}</h3>
      <p><span>{degree.degree}</span>, {degree.startDate}&ndash;{degree.endDate}</p>
    </div>
  );
}

function AddDegreeForm() {

}

function WorkExperience() {
  const [jobs, setJobs] = useState(dummyJobs);

  return (
    <section className="jobs">
      <h2>Work Experience</h2>
      { jobs.map(job => <Job key={job.id} job={job} />) }
    </section>
  );
}

function Job({ job }) {
  const responsibilities = job.responsibilities
    ? <ul>{job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>
    : null;

  return (
    <div className="jobs__job">
      <h3>{job.company}</h3>
      <h4>{job.position}, {job.startDate}&ndash;{job.endDate ? job.endDate : "present"}</h4>
      {responsibilities}
    </div>
  );
}

function AddJobForm() {

}

export default App;

const dummy = {
  firstName: 'Brian',
  lastName: 'Hamilton',
  email: 'bhamilton@flsouthern.edu',
  phone: '123-456-7890',
  url: 'https://bdhamilton.com/'
};

const dummyJobs = [
  {
    id: 0,
    company: 'Florida Southern College',
    position: 'Associate Professor of Religion',
    responsibilities: ['Taught undergrads', 'Ran the Honors Program'],
    startDate: '2021',
    endDate: null
  },
  {
    id: 1,
    company: 'Florida Southern College',
    position: 'Assistant Professor of Religion',
    responsibilities: null,
    startDate: '2015',
    endDate: '2021'
  }
];

const dummyDegrees = [
  {
    id: 0,
    school: 'University of Notre Dame',
    degree: 'Ph.D.',
    startDate: '2009',
    endDate: '2015'
  },
  {
    id: 1,
    school: 'University of Notre Dame',
    degree: 'M.T.S.',
    startDate: '2006',
    endDate: '2008'
  },
  {
    id: 2,
    school: 'Messiah University',
    degree: 'B.A.',
    startDate: '2003',
    endDate: '2005'
  }
];