import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


class StaffList extends Component {
    constructor(props) {
        super(props);

        this.state = {
           selectedStaff: null
        }
    }

    onStaffSelect(staff) {
        this.setState({ selectedStaff: staff});
    }

    render() {
        const StaffList = this.props.staffs.map((staff) => {
            return (
                <div key={staff.id} className="col-12 col-md-6 col-lg-4">
                    <Card onClick={() => this.onStaffSelect(staff)}>
                        <CardTitle>{(staff.id) + 1}. {staff.name}</CardTitle>
                    </Card>
                </div>
            )
        });
        return (
            <div className="container">
                <div className="row">
                    {StaffList}
                </div>
            </div>
        )
      }
}

export default StaffList;
