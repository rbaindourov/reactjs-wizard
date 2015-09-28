// Write your package code here!

InputField = React.createClass({

  templateName: "InputField",

  render: function() {
      var model  = this.props.model;
      switch( model.type ){
        case 'Text':
          return( <input className="form-control fade-in" id={model.id} name={model.id} type="text" placeholder={model.label}/> );
        break;

        /*
        case 'Integer':
          return( <input className="form-control fade-in" id={model.id} name={model.id} type="number" placeholder={model.label}/> );
        break;
        */


        case 'Integer':
          return(
               <div className="form-row">
                  <label htmlFor={model.id}> {model.label} </label>
                  <div className="input-group medium">
                    <input className="form-control fade-in" id={model.id} name={model.id} type="number" placeholder={model.label}/>
                    <span className="input-group-addon">pcs</span>
                  </div>
                </div>
            );
        break;

        case 'Currency':
          return(
            <div className="form-row">
              <label htmlFor={model.id}> {model.label} </label>
              <div className="input-group medium">
                <span className="input-group-addon">$</span>
                <input className="form-control currency fade-in" defaultValue="0.00" min="0" step="0.01"
                  data-number-to-fixed="2" data-number-stepfactor="100" id={model.id}
                  name={model.id} type="number" placeholder={model.label} />
              </div>
            </div>);
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
            <div className="input-group medium">
              <label htmlFor={model.id} className="fade-in">{model.label}
              <select id={model.id} className="form-control">
                {model.values.map( (value) => {
                  return (
                    <option key={value} value={value}>{value}</option>
                  )
                })}
              </select>
              </label>
            </div>
          )
        break;

        default:
          return(<span key={model.id}> new field </span>)

      }
  }
});
