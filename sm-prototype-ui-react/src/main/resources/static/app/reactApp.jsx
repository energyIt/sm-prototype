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
    getInitialState: function() {
        return {data: []}
    },
    componentDidMount: function() {
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
    render: function() {
        if( (this.state.data || []).length === 0 ) {
            return (
                <EmptyGrid></EmptyGrid>
            );
        }
        console.log('user grid render: ' + this.state.data)
        var rows = this.state.data.map( function( row ) {
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
    render: function() {
        return (
            <div>
                <div className="page-header">
                    <h1>User Groups</h1>
                </div>
                <div className="form-group btn-group-sm">
                    <button className="btn btn-info" type="button" title="Add">
                        <span className="glyphicon glyphicon-plus"></span>
                    </button>
                </div>
                <UserGrid data={data} />
            </div>
        );
    }
});

ReactDOM.render(
    <UserWrapper />,
    document.getElementById('react')
);
