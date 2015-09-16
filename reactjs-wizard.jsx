// Write your package code here!

Wizard = React.createClass({

  mixins: [ReactMeteorData],
  templateName: "Wizard",


  handleNext: function(){
    try{
      console.log('handleNext', arguments)
      var page = ( parseInt( this.state['page'] )+ 1 );
      var state =  { page:page };
      this.setState( state );
    } catch( e ){
      console.log( 'handleNext', 'error', e );
    }
  },

  handleSubmit: function( e){
    this.setState({finished:true});


  },

  getMeteorData: function() {
    try{

      console.log( 'getMeteorData')

      var handle =  Meteor.subscribe("FormFields");
      var query =  { "wizard":this.props['name'] };
      var formFields = FormFields.find( query ).fetch();
      var pages = [];
      var next =  false;

      formFields.forEach( (item) => {
        if( pages[item.page] == undefined )
            pages[item.page] = [ item ];
        else
            pages[item.page].push( item );
      })


      return {
            ready: handle.ready(),
            FormFields: formFields,
            Pages: pages
      }

    }catch( e ){
      console.log( 'getMeteorData', e )

    }
  },

  getInitialState: function(){
    console.log( 'getInitialState', this.props );
    var startPage = ( this.props['page'] ) ?  this.props['page'] : 1;
    return {
      page: startPage,
      wizard: this.props['name'],
    }
  },

  renderField: function(model) {
      console.log('renderField', model );
      switch( model.type ){
        case 'Text':
          return( <input className="form-control" key={model.id} id={model.id} name={model.id} type="text" placeholder={model.label}/> );
        break;

        case 'Integer':
          return( <input className="form-control" key={model.id} id={model.id} name={model.id} type="number" placeholder={model.label}/> );
        break;

        case 'Currency':
          return( <input className="form-control" key={model.id} id={model.id} name={model.id} type="number" placeholder={model.label}/> );
        break;

        case 'Date':
          return(
            <div key={model.id} className="form-group">
                <label htmlFor={model.id}> {model.label} </label>
                <input className="form-control" key={model.id} id={model.id} name={model.id} type="date" placeholder={model.label}/>
            </div>
          )
        break;

        case 'TrueFalse':
          return(
            <div key={model.id} className="checkbox">
              <label htmlFor={model.id}>
                <input type="checkbox" id={model.id} name={model.id} />{model.label}
              </label>
            </div>
          )
        break;

        case 'TextArea':
          return(
            <div  key={model.id} className="form-group">
              <label htmlFor={model.id}>{model.label}</label>
              <textarea className="form-control" id={model.id} name={model.id}></textarea>
            </div>
          )
        break;


        case 'List':
          return(

              <label key={model.id} htmlFor={model.id}>{model.label}
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

  },

  render: function() {
    console.log('wizard','render', this.data, this.state )
    var wizard =  this;

    if( this.state['finished'] &&  this.state['finished'] === true)
      return <div> Opportunity Added </div>;



    if ( !this.data.ready ) {
      return <div> Fetching Data </div>;
    }


    return (
      <form method="POST" action="/postResult" className="form" onSubmit={this.handleSubmit}>
        {this.data.FormFields.map(function (row) {
          if( wizard.state['page'] == row.page )
            return (
              wizard.renderField( row )
            );
        })}
        <div className="form-group">
          { this.data.Pages[ (this.state.page+1) ] != undefined  ? <input type="button" value="next" className="btn btn-default" onClick={this.handleNext} id="next" name="next" /> : <input type="button" value="finished" className="btn btn-default" onClick={this.handleSubmit} id="submit" name="submit"/> }
        </div>
      </form>
    );
  }
});
