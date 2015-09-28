// Write your package code here!

Opportunity = new Mongo.Collection('opportunity');
Opportunity.allow({
  insert:function(){
    return true;
  },
  update:function(){
    return true;
  }
})

Meteor.methods({
  updateOpportunity: function( _id, entry ) {
    console.log('addOpportunity', entry );
    Opportunity.update( {_id:_id}, {$set:entry}, {upsert:true});
  }
});


Wizard = React.createClass({

  mixins: [ReactMeteorData],
  templateName: "Wizard",

  handleNext: function(){
    try{
      console.log('handleNext', arguments)
      var page = ( parseInt( this.state['page'] )+ 1 );
      var state =  { page:page };
      var wizard =  this;

      this.data.FormFields.map(function (row) {
        if( wizard.state['page'] == row.page ){
          Session.set( row.id, $( '#'+row.id ).val() );
        }
      })
      this.updateMeteorData();
      this.setState( state );
    } catch( e ){
      console.log( 'handleNext', 'error', e );
    }
  },

  handleSubmit: function( e){

    var userInfo =  Session.get('userInfo') ;
    console.log('handleSubmit', userInfo)
    if( userInfo === undefined || userInfo === null ){
        console.error( this, this.data );
        throw new Meteor.Error('No User ID, plesase login first.');
    }

    this.data.FormFields.map(function (row) {
      if( wizard.state['page'] == row.page ){
        Session.set( row.id, $( '#'+row.id ).val() );
      }
    })
    Session.set('completed','true');
    this.updateMeteorData();
    this.setState({finished:true});
  },

  updateMeteorData(){
    console.log('updateMeteorData')
    var entry = { }
    this.data.FormFields.forEach( function(row) {
      entry[row.id]=Session.get(row.id);
    })

    var wizard = Session.get('wizard');
    Meteor.call('updateOpportunity', wizard._id, entry );

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

    var userInfo = Session.get('userInfo');

    if( userInfo === undefined ){
      throw new Meteor.Error('No User ID, plesase login first.');
    }

    var startPage = ( this.props['page'] ) ?  this.props['page'] : 1;

    //TODO account for new vs recovery
    var _id = Opportunity.insert({ product:this.props['name'], userId:userInfo.id})
    Session.set('wizard', {_id:_id, product:this.props['name'], userId:userInfo.id});

    return {
      page: startPage,
      wizard: this.props['name'],
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
              <InputField key={row.id} model={row} />
            );
        })}
        <div className="form-group">
          { this.data.Pages[ (this.state.page+1) ] != undefined  ? <input type="button" value="next" className="btn btn-default" onClick={this.handleNext} id="next" name="next" /> : <input type="button" value="finished" className="btn btn-default" onClick={this.handleSubmit} id="submit" name="submit"/> }
        </div>
      </form>
    );
  }
});
