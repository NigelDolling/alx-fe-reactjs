import './App.css'
import RegistrationForm from './components/RegistrationForm.jsx'
import FormikRegistrationForm from './components/formikForm.js'

function App() {
  return (
    <>
      <h1>Form Handling in React</h1>
      <div className="card">
        <RegistrationForm />
      </div>
      <div className="card" style={{ marginTop: 24 }}>
        <FormikRegistrationForm />
      </div>
    </>
  )
}

export default App
