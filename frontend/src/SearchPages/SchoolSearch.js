import React, { Component } from 'react';
import Header from '../HeaderFooter/Header'
import URL from '../URLHelperFunctions';
import $ from 'jquery';

class SchoolSearch extends Component {

	constructor() {
		super();
		var queryString = URL.queryString();
		var schoolName = URL.plusToSpace(queryString.substring(queryString.indexOf("=")+1));
		this.state = {
			"schoolName": schoolName,
			"schools" : []
		}
	}

	componentWillMount() {
		$.ajax({
			url: 'http://35.202.103.55/schoolsearch?' + URL.toUrl(this.state.schoolName), dataType: 'json', cache: false, 
			success: function(data) {
				var state = this.state;
				state.schools = data.schools;
				console.log(state.schools);
				this.setState(state);
			}.bind(this), error: function(xhr, status, error) {
			}.bind(this)
		});

	}

	noSchools() {
		return (
			<div className="wide centered centerText">No schools found.</div>
		);
	}

	render() {
		var queryString = URL.queryString();
		var schoolName = URL.plusToSpace(queryString.substring(queryString.indexOf("=")+1));
		let allSchools = this.state.schools.map(school => {
			return (
				<a href={"classSearch/" + school} className="listBoxLink">
					<div className="wide listBox">
						<h3>{school.replace("_", " ")}</h3>
					</div>
				</a>
			);
		});

		if (allSchools == "") {
			allSchools = this.noSchools();
		}

		return(
			<div className="pageContent">
				<Header />
				<div className="wide centered">
					<form className="wide searchbar centered" action="school.html">
						<input id="schoolSearchField" className="wideSearchField" type="text" placeholder="Search for your school" defaultValue={schoolName} name="school" />
						<button type="submit"><i className="fa fa-search"></i></button>
					</form>
					{allSchools}
				</div>
				<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
			</div>
		);
	}
}
export default SchoolSearch;
