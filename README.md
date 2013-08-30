hourglass
=========

A multi stopwatch web-app with minimal analytics

Functional design:
------------------

- Createable Hourglass button list: create, delete and update (Button tag, color, description [and jira issue {done by system in a created measure}])
	-> Unfortunately the delete will not retro-actively delete all the measures taken with that hourglass!
- List of Hourglass buttons (representing types of measure that can be taken):
	-> Jira issue input field with "Issue button". This makes sure every measure taken with any Hourglass has a correlated issue number
	-> Indication if the hourglass is running on the pressed button
	-> Big "Stop button" on top of page (to indicate the end of a day)
	-> When pressing a "Hourglass button" it measures the time spend
	-> When one "Hourglass" button is running the button is disabled, you press another "Hourglass button" or the "Stop button" to end that measure
	-> In the bottom of the page a days-interval input filter to control the charts output with
	-> Piechart (indicating the time spend in the different hourglasses, the chart gets updated every time a "Hourglass button" or the "Stop button" is clicked)
	-> Barchart with filter-form-input tags of all the "Hourglass buttons":
		- X-axis: days interval
		- Y-axis: minutes spend in filtered tag
	-> "Export button" to export a list of "Log work" entries for every issue on a per day basis for input in Jira.

Domain design:
--------------

- Hourglass: id (mandatory), tag (mandatory/unique), description (optional), issue (optional), color (mandatory)
- Measure: id (mandatory), start_timestamp (mandatory), end_timestamp (mandatory), hourglass (mandatory)

	eg. the hourglasses created:

{
    hourglasses = [{
        id: '111',
        tag: 'Toilet/Break',
        description: 'Some description',
        color: '#FFF'
    }, {
	id: '151',
        tag: 'Implementation',
        description: 'Some description',
        color: '#000'
    }]
}

	eg. possible recorded measures (with the hourglass attached, no id and queryable with mongolab by timestamps interval):
{
    measures = [{
        id: '52sqfs4f5s4f',
        start: '12:00:00,152 10-07-2013',
        end: '14:00:00,152 10-07-2013',
        hourglass: {
            tag: 'Toilet/Break',
            description: 'Some description',
            issue: 'PRTR-904',
            color: '#FFF'
        }
    }, {
        id: '88sqfs4f5s4f',
        start: '15:00:00,152 10-07-2013',
        end: '16:00:00,152 10-07-2013',
        hourglass: {
            tag: 'Implementation',
            description: 'Some description',
            issue: 'PRTR-905',
            color: '#000'
        }
    }]
}

Time tracking:
--------------

31/08/2013 7u20 -> 8u00 : Functional design
31/08/2013 11u00 -> 12u00 : Domain design
31/08/2013 12u00 -> 12u30 : Project setup