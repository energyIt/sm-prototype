function Bus() {
    this.registered = {},
    this.register = function( key, fun ) {
        this.registered[key] = fun;
    },
    this.invoke = function( key, m ) {
        if( this.registered[key] ) {
            this.registered[key](m);
        }
    }
}

var myBus = new Bus();

var Container = React.createClass({
    componentWillMount: function() {
        myBus.register('invokeFoo', this.foo);
    },
    render: function() {
        return (<h1>TEST: {this.props.children}</h1>)
    },
    foo: function( m ) {
        alert('foo: ' + m);
    }
})

var Button = React.createClass({
    buttonPressed: function() {
        myBus.invoke('invokeFoo',this.props.name);
    },
    render: function() {
        return (<button onClick={this.buttonPressed}>TEST</button>)
    }
})

var Both = React.createClass({
    render: function() {
        return (
            <Container>
                <Button name="bar" />
                <Button name="baz" />
            </Container>
        )
    }
})

ReactDOM.render(
    <Both/>,
    document.getElementById('react')
);