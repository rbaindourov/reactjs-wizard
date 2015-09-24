// Write your package code here!

InputField = React.createClass({

  templateName: "InputField",

  render: function() {
      var model  = this.props.model;
      switch( model.type ){
        case 'Text':
          return( <input className="form-control fade-in" id={model.id} name={model.id} type="text" placeholder={model.label}/> );
        break;

        case 'Integer':
          return( <input className="form-control fade-in" id={model.id} name={model.id} type="number" placeholder={model.label}/> );
        break;

        case 'Currency':
          return( <input className="form-control fade-in" id={model.id} name={model.id} type="number" placeholder={model.label}/> );
        break;

        case 'Date':
          return(
            <div className="form-group fade-in">
                <label htmlFor={model.id}> {model.label} </label>
                <input className="form-control" key={model.id} id={model.id} name={model.id} type="date" placeholder={model.label}/>
            </div>
          )
        break;

        case 'TrueFalse':
          return(
            <div className="checkbox fade-in">
              <label htmlFor={model.id}>
                <input type="checkbox" id={model.id} name={model.id} />{model.label}
              </label>
            </div>
          )
        break;

        case 'TextArea':
          return(
            <div  className="form-group fade-in">
              <label htmlFor={model.id}>{model.label}</label>
              <textarea className="form-control" id={model.id} name={model.id}></textarea>
            </div>
          )
        break;

        case 'List':
          return(

              <label htmlFor={model.id} className="fade-in">{model.label}
              <select id={model.id} className="form-control">
                {model.values.map( (value) => {
                  return (
                    <option key={value} value={value}>{value}</option>
                  )
                })}
              </select>
              </label>
          )
        break;

        default:
          return(<span key={model.id}> new field </span>)

      }
  }
});
