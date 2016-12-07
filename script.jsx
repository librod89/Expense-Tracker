/*global React, ReactDOM, $ */
(function () {
	"use strict";
	
	var InputFrame = React.createClass({
		localAddExpense: function (event) {
			event.preventDefault();
			var addExpense = this.props.addExpense,
				price = this.refs.price,
				name = this.refs.name;
	
			addExpense(name.value, price.value.replace("$", ""));
	
			price.value = "$";
			name.value = "";
		},
		render: function () {
			return (
				<div className="input-frame">
					<form onSubmit={this.localAddExpense}>
						<input type="text" className="name" placeholder="Type an expense..." ref="name"></input>
						<input type="text" className="price" defaultValue="$" ref="price"></input>
						<button className="btn btn-default btn-md submit">Submit</button>
					</form>
				</div>
			);
		}
	});

	var ExpenseFrame = React.createClass({
		render: function () {
			var expensesFrame = [],
				expenses = this.props.expenses,
				removeExpense = this.props.removeExpense;

			expensesFrame = expenses.map(function(e){
				return (
					<li className="well">
						<label className="name">{e.name}</label>
						<label className="price">{e.price}</label>
						<label className="glyphicon glyphicon-remove remove"
								onClick={removeExpense.bind(null, e.name, e.price)}></label>
					</li>
				);
			});

			return (
				<ul className="expense-frame">
					{expensesFrame}
				</ul>  
			);
		}
	});

	var TotalFrame = React.createClass({
		render: function () {
			return (
				<div className="total-frame">
					<label className="total-header">Total: </label>
					<label className="total-value">{this.props.total}</label>
				</div>
			);
		}
	});

	var MainFrame = React.createClass({
		getInitialState: function () {
			return ({
				expenses: [{name: "Hair products", price: "50"}, {name: "McDonalds", price: "25"}]
			});
		},
		addExpense: function (name, price) {
			this.setState({
				expenses: this.state.expenses.concat({
					name: name,
					price: price
				})
			});
		},
		removeExpense: function (name, price) {
			var expenses = this.state.expenses;
			for (var index in expenses) {
				var ex = expenses[index];
				if (ex.name === name && ex.price === price) {
					expenses.splice(index, 1);
					this.setState({expenses: expenses});
					return;
				}
			}
		},
		getTotal: function () {
			return this.state.expenses.reduce(function (total, e) {
				return total + parseInt(e.price);
			}, 0);
		},
		render: function () {
			var expenses = this.state.expenses,
				total = this.getTotal();
			return (
				<div className="main-frame">
					<div className="jumbotron">
						<h1 className="main-header">Expense Tracker</h1>
						<InputFrame addExpense={this.addExpense} />
						<ExpenseFrame 	expenses={expenses}
										removeExpense={this.removeExpense}/>
						<TotalFrame total={total} />
					</div>
				</div>
			);
		}
	});

	ReactDOM.render(<MainFrame />, document.getElementById("container"));
})();

$(function () {
	$(document).on("mouseover", function () {
		$(".expense-frame").sortable({connectWith: ".expense-frame"});
	});
});
