import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Icon from '@mdi/react';
import { mdiWeb, mdiEmailOutline, mdiCellphone, mdiPencil, mdiTrashCanOutline } from '@mdi/js';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

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
  const [formOpen, setFormOpen] = useState(false);

  const onOpenModal = () => setFormOpen(true);
  const onCloseModal = () => setFormOpen(false);

  function handleInput(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value
    });
  }

  return (
    <header>
      <h1>{person.firstName + ' ' + person.lastName}</h1>
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
        <button onClick={onOpenModal}><Icon path={mdiPencil} size={.8} /></button>

        <Modal open={formOpen} onClose={onCloseModal} center>
          <form>
          <h2>Update Personal Info</h2>
            <label>
              First Name:
              <input value={person.firstName} name="firstName" onChange={handleInput} />
            </label>
            <label>
              Last Name:
              <input value={person.lastName} name="lastName" onChange={handleInput} />
            </label>
            <label>
              Website:
              <input type="text" name="url" value={person.url} onChange={handleInput} />
            </label>
            <label>
              Email Address:
              <input type="email" name="email" value={person.email} onChange={handleInput} />
            </label>
            <label>
              Phone Number:
              <input type="phone" name="phone" value={person.phone} onChange={handleInput} />
            </label>
            <button onClick={(e) => { e.preventDefault(); onCloseModal(); }}>Save</button>
          </form>
        </Modal>
      </div>
    </header>
  );
}

function Education() {
  const [degrees, setDegrees] = useState(dummyDegrees);
  const [formOpen, setFormOpen] = useState(false);

  const onOpenModal = () => setFormOpen(true);
  const onCloseModal = () => setFormOpen(false);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = e.target.elements;

    const newDegree = {
      id: uuidv4(),
      school: formData.school.value,
      degree: formData.degree.value,
      startDate: formData.startDate.value,
      endDate: formData.endDate.value
    };
    setDegrees([
      newDegree,
      ...degrees
    ]);
  }

  function handleEdit(e, id) {
    setDegrees(degrees.map((d => {
      if (d.id === id) {
        return {
          ...d,
          [e.target.name]: e.target.value
        };
      } else {
        return d;
      }
    })));
  }

  function handleDelete(id) {
    setDegrees(degrees.filter(d => d.id !== id));
  }

  const sortedDegrees = degrees.slice().sort((a, b) => {
    const aEndDate = a.endDate ? a.endDate : Infinity;
    const bEndDate = b.endDate ? b.endDate : Infinity;

    return bEndDate - aEndDate;
  });

  return (
    <section className="education">
      <h2>Education <button onClick={onOpenModal}>+</button></h2>
      {sortedDegrees.map(degree => <Degree key={degree.id} degree={degree} handleDelete={handleDelete} handleEdit={handleEdit} />)}
      <Modal open={formOpen} onClose={onCloseModal} center>
        <form onSubmit={handleSubmit}>
          <h2>Add Education</h2>
          <label>
            School: 
            <input type="text" name="school" required />
          </label>
          <label>
            Degree: 
            <input type="text" name="degree" required />
          </label>
          <label>
            Start Year:
            <input type="text" name="startDate" required />
          </label>
          <label>
            End Year:
            <input type="text" name="endDate" />
          </label>
          <button type="submit">Add Degree</button>
        </form>
      </Modal>
    </section>
  );
}

function Degree({ degree, handleDelete, handleEdit }) {
  const [formOpen, setFormOpen] = useState(false);

  const onOpenModal = () => setFormOpen(true);
  const onCloseModal = () => setFormOpen(false);
  
  return (
    <div className="education__degree">
      <div>
        <h3>{degree.school}</h3>
        <p><span>{degree.degree}</span>, {degree.startDate}&ndash;{degree.endDate ? degree.endDate : "present"}</p>
      </div>
      <div className="item_buttons">
        <button onClick={onOpenModal}><Icon path={mdiPencil} size={.7} /></button>
        <button onClick={() => handleDelete(degree.id)}><Icon path={mdiTrashCanOutline} size={.7} /></button>
      </div>

      <Modal open={formOpen} onClose={onCloseModal} center>
        <form onSubmit={(e) => { e.preventDefault(); onCloseModal(); }}>
          <h2>Add Education</h2>
          <input type="hidden" name="degreeId" value={degree.id} />
          <label>
            School: 
            <input type="text" name="school" value={degree.school} onChange={(e) => handleEdit(e, degree.id)} required />
          </label>
          <label>
            Degree: 
            <input type="text" name="degree" value={degree.degree} onChange={(e) => handleEdit(e, degree.id)} required />
          </label>
          <label>
            Start Year:
            <input type="text" name="startDate" value={degree.startDate} onChange={(e) => handleEdit(e, degree.id)} required />
          </label>
          <label>
            End Year:
            <input type="text" name="endDate" value={degree.endDate ? degree.endDate : ""} onChange={(e) => handleEdit(e, degree.id)} />
          </label>
          <button type="submit">Save Edits</button>
        </form>
      </Modal>
    </div>
  );
}

function WorkExperience() {
  const [jobs, setJobs] = useState(dummyJobs);
  const [formOpen, setFormOpen] = useState(false);

  const onOpenModal = () => setFormOpen(true);
  const onCloseModal = () => setFormOpen(false);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = e.target.elements;

    const newJob = {
      id: uuidv4(),
      company: formData.company.value,
      position: formData.position.value,
      startDate: formData.startDate.value,
      endDate: formData.endDate.value
    };

    setJobs([
      newJob,
      ...jobs
    ]);
  }

  function handleEdit(e, id) {
    setJobs(jobs.map((j => {
      if (j.id === id) {
        return {
          ...j,
          [e.target.name]: e.target.value
        };
      } else {
        return j;
      }
    })));
  }

  function handleDelete(id) {
    setJobs(jobs.filter(d => d.id !== id));
  }

  const sortedJobs = jobs.slice().sort((a, b) => {
    const aEndDate = a.endDate ? a.endDate : Infinity;
    const bEndDate = b.endDate ? b.endDate : Infinity;

    return bEndDate - aEndDate;
  });

  return (
    <section className="jobs">
      <h2>Work Experience <button onClick={onOpenModal}>+</button></h2>
      { sortedJobs.map(job => <Job key={job.id} job={job} handleDelete={handleDelete} handleEdit={handleEdit} />) }
      <Modal open={formOpen} onClose={onCloseModal} center>
        <form onSubmit={handleSubmit}>
          <h2>Add Work Experience</h2>
          <label>
            Company: 
            <input type="text" name="company" required />
          </label>
          <label>
            Position: 
            <input type="text" name="position" required />
          </label>
          <label>
            Start Year:
            <input type="text" name="startDate" required />
          </label>
          <label>
            End Year:
            <input type="text" name="endDate" />
          </label>
          <button type="submit">Add Work Experience</button>
        </form>
      </Modal>
    </section>
  );
}

function Job({ job, handleDelete, handleEdit }) {
  const [formOpen, setFormOpen] = useState(false);

  const onOpenModal = () => setFormOpen(true);
  const onCloseModal = () => setFormOpen(false);

  const responsibilities = job.responsibilities
    ? <ul>{job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>
    : null;

  return (
    <div className="jobs__job">
      <div>
        <h3>{job.company}</h3>
        <h4>{job.position}, {job.startDate}&ndash;{job.endDate ? job.endDate : "present"}</h4>
        {responsibilities}
      </div>
      <div className="item_buttons">
        <button onClick={onOpenModal}><Icon path={mdiPencil} size={.7} /></button>
        <button onClick={() => handleDelete(job.id)}><Icon path={mdiTrashCanOutline} size={.7} /></button>
      </div>

      <Modal open={formOpen} onClose={onCloseModal} center>
        <form onSubmit={(e) => { e.preventDefault(); onCloseModal(); }}>
          <h2>Edit Work Experience</h2>
          <label>
            Company: 
            <input type="text" name="company" value={job.company} onChange={(e) => handleEdit(e, job.id)} required />
          </label>
          <label>
            Position: 
            <input type="text" name="position" value={job.position} onChange={(e) => handleEdit(e, job.id)} required />
          </label>
          <label>
            Start Year:
            <input type="text" name="startDate" value={job.startDate} onChange={(e) => handleEdit(e, job.id)} required />
          </label>
          <label>
            End Year:
            <input type="text" name="endDate" value={job.endDate ? job.endDate : ""} onChange={(e) => handleEdit(e, job.id)} />
          </label>
          <button type="submit">Save changes</button>
        </form>
      </Modal>
    </div>
  );
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