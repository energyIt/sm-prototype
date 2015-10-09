var UserRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.id1}</td>
                <td>{this.props.id2}</td>
                <td>{this.props.id3}</td>
                <td>{this.props.name}</td>
                <td className="btn-group-sm">
                    <button className="btn btn-success" type="button" title="Edit">
                        <span className="glyphicon glyphicon-edit"></span>
                    </button>
                    <button className="btn btn-danger" type="button" title="Delete">
                        <span className="glyphicon glyphicon-trash"></span>
                    </button>
                </td>
            </tr>
        )
    }
});

var EmptyGrid = React.createClass({
    render: function() {
        return (
            <div className="alert alert-info" role="alert">
                There are no items yet.
            </div>
        )
    }
})

var UserGrid = React.createClass({
    render: function() {
        if( (this.props.data || []).length === 0 ) {
            return (
                <EmptyGrid></EmptyGrid>
            );
        }
        var rows = this.props.data.map( function( row ) {
            return ( <UserRow key={row.id} id1={row.id} id2={row.id2} id3={row.id3} name={row.name} ></UserRow> );
        });
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID2</th>
                        <th>ID3</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
});

var UserWrapper = React.createClass({
    getInitialState: function() {
        return {data: []}
    },
    loadData: function() {
        $.ajax({
            url: 'api/userGroup',
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log(data);
                this.setState({data: data._embedded.userGroup});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function() {
        this.loadData();
    },
    addNew: function() {
        this.setState({displayForm: true});
    },
    onFormSubmit: function( data ) {
        debugger;
        var me = this;
        $.ajax({
            url: 'api/userGroup',
            dataType: 'json',
            type: 'POST',
            data: JSON.stringify(data),//{ id: '1234567890123450', id3: '1234567890123456', name: 'blabbb'},
            contentType: "application/json;",
            success: function() {
                console.log('success in POST');
                me.loadData();
            },
            error: function() {
                console.error('error during POST');
            }
        })
    },
    render: function() {
        return (
            <div>
                <div className="page-header">
                    <h1>User Groups</h1>
                </div>
                <div className="form-group btn-group-sm">
                    <button className="btn btn-info" type="button" title="Add" onClick={this.addNew}>
                        <span className="glyphicon glyphicon-plus"></span>
                    </button>
                </div>
                <UserGrid data={this.state.data}></UserGrid>
                <UserForm display={this.state.displayForm} onFormSubmit={this.onFormSubmit}></UserForm>
            </div>
        );
    }
});

var UserForm = React.createClass({
    getInitialState: function() {
        return { valIssue: {}}
    },
    handleSubmit: function() {
        this.props.onFormSubmit(this.formValue);
    },
    validationRules: {
        'id': function(val) {
            return {result: (val || '').length === 16, msg: 'Size has to be 16'};
        }
    },
    validate: function( changeMap ) {
        var me = this;
        var validationResult = true;
        for( var key in changeMap ) {
            var valResult = me.validationRules[key](changeMap[key]);
            var valIssue = {};
            valIssue[key] = valResult.result ? null : valResult.msg
            me.setState( { valIssue: valIssue });
            validationResult = valResult.result && validationResult;
        }
        return validationResult;
    },
    formValue: {},
    render: function() {
        if( this.props.display === true ) {
            return (
                <form className="form-horizontal">
                    <div className="input-group">
                        <TextField label="ID" placeholder="id..." k="id" data={this.formValue} validate={this.validate} validationError={this.state.valIssue['id']}/>
                        <TextField label="ID2" placeholder="id2..." k="id2" data={this.formValue} />
                        <TextField label="ID3" placeholder="id3..." k="id3" data={this.formValue} />
                        <TextField label="NAME" placeholder="name..." k="name" data={this.formValue} />
                        <button className="btn btn-success" type="button" title="Save" onClick={this.handleSubmit}>
                            <span className="glyphicon glyphicon-ok" ng-transclude>Save</span>
                        </button>
                    </div>
                </form>)
        } else {
            return null;
        }
    }
});

var TextField = React.createClass({
    valueChanged: function(e) {
        var validatable = {};
        validatable[this.props.k] = e.target.value;
        if( !this.props.validate || this.props.validate(validatable) ) {
            this.props.data[this.props.k] = e.target.value;
        }
    },
    render: function() {
        var validationError = (this.props.validationError || '');
        return (
            <div className="form-group">
                <label className="col-sm-3 ">{this.props.label}</label>
                <div className="col-sm-9">
                    <input type="text" onChange={this.valueChanged} className="form-control" placeholder={this.props.placeholder} ref={this.props.ref}/>
                    {validationError}
                </div>
            </div>)
    }
})

ReactDOM.render(
    <UserWrapper></UserWrapper>,
    document.getElementById('react')
);
