import { useState, FormEvent, ChangeEvent } from 'react';

interface GameAnswers {
  name: string;
  place: string;
  animal: string;
  thing: string;
}

interface InputFormProps {
  currentLetter: string;
  onSubmit: (answers: GameAnswers) => void;
  disabled: boolean;
}

const InputForm = ({ currentLetter, onSubmit, disabled }: InputFormProps) => {
  const [formData, setFormData] = useState<GameAnswers>({
    name: '',
    place: '',
    animal: '',
    thing: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim().length >= 2);
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={disabled}
          placeholder={`Enter a name starting with ${currentLetter}`}
          autoComplete="off"
        />
      </div>

      <div className="form-group">
        <label htmlFor="place">Place:</label>
        <input
          type="text"
          id="place"
          name="place"
          value={formData.place}
          onChange={handleChange}
          disabled={disabled}
          placeholder={`Enter a place starting with ${currentLetter}`}
          autoComplete="off"
        />
      </div>

      <div className="form-group">
        <label htmlFor="animal">Animal:</label>
        <input
          type="text"
          id="animal"
          name="animal"
          value={formData.animal}
          onChange={handleChange}
          disabled={disabled}
          placeholder={`Enter an animal starting with ${currentLetter}`}
          autoComplete="off"
        />
      </div>

      <div className="form-group">
        <label htmlFor="thing">Thing:</label>
        <input
          type="text"
          id="thing"
          name="thing"
          value={formData.thing}
          onChange={handleChange}
          disabled={disabled}
          placeholder={`Enter a thing starting with ${currentLetter}`}
          autoComplete="off"
        />
      </div>

      <button 
        type="submit" 
        disabled={disabled || !isFormValid()}
        className="submit-button"
      >
        Submit Answers
      </button>
    </form>
  );
};

export default InputForm;