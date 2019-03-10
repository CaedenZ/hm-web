import { Toolbar, IconButton, List, ListItem, ListItemText, Menu, MenuItem } from "@material-ui/core";
import React from "react";


 export class CompanySelect extends React.Component<any, any> {

    state: any = {
        mobileOpen: false,
        anchorEl: null,
        selectedIndex: 1,
      };

    handleClickListItem = (event:any) => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleMenuItemClick = (event:any, index:any) => {
        this.setState({ selectedIndex: index, anchorEl: null });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };
  
render(){
    const {classes, theme } = this.props;
    const { anchorEl } = this.state;
    
    const options = [
        'Campany 1',
        'Campany 2',
        'Campany 3',
        'Campany 4',
      ];

    return(
        <div>
            <List component="nav">
              <ListItem
                button
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label="Welcome to"
                onClick={this.handleClickListItem}
              >
                <ListItemText
                  primary={options[this.state.selectedIndex]}
                />
              </ListItem>
            </List>
            <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              disabled={index === 0}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
          </div>
    )
}
  }

  export default CompanySelect;
