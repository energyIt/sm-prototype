var UserGrid = React.createClass({
    render: function() {
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
                    <tr>
                        <td>id</td>
                        <td>id2</td>
                        <td>id3</td>
                        <td>name</td>
                        <td className="btn-group-sm">
                            <button className="btn btn-success" type="button" title="Edit">
                                <span className="glyphicon glyphicon-edit"></span>
                            </button>
                            <button className="btn btn-danger" type="button" title="Delete">
                                <span className="glyphicon glyphicon-trash"></span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
});

var UserRow = React.createClass({
    render: function() {

    }
});

ReactDOM.render(
    <UserGrid />,
    document.getElementById('react')
)
