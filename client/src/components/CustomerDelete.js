import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'

class CustomerDelete extends React.Component{

    constructor(props){
        super(props);
        this.state={
            open: false
        }
    }
    
    //사용자가 고객 추가 버튼을 눌러서 고객 추가 모달창이 뜨게 해줌
    hnadleClickOpen =() =>{
        this.setState({
            open: true
        });
    }

    handleClose=()=>{
        this.state={
            open: false
        }
    }

    deleteCustomer(id){
        const url = '/api/customers/' + id;
        fetch(url,{
            method:'DELETE'
        });
        this.props.stateRefresh();
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.hnadleClickOpen}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        삭제 경고
                </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객 정보가 삭제 됩니다.
                    </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => { this.deleteCustomer(this.props.id) }}>삭제</Button>
                        <Button variant="contained" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default CustomerDelete;