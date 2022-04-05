import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


class StaffList extends Component {
    constructor(props) {
        super(props);

        this.state = {
           selectedStaff: null
        }
    }

    render() {
        const StaffList = this.props.staffs.map((staff) => {
            return (
                <div key={staff.id} className="col-12 col-sm-6 col-md-4">
                    <Card>
                        <CardTitle>{staff.name}</CardTitle>
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
