import React from 'react';
import Chart from '@bit/nexxtway.react-rainbow.chart';
import Dataset from '@bit/nexxtway.react-rainbow.dataset';

const containerStyles = {
  width: 600,
};


export default class LineChartExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: ['Public Repos', 'Following', 'Followers', 'Public Gist'],
            datasets:props.dataset,
        };
    }



  
 

    

    renderDatasets() {
        const { datasets } = this.state;
        return datasets.map(({ title, values, borderColor }) => (
            <Dataset
                key={title}
                title={title}
                values={values}
                borderColor={borderColor}
                backgroundColor={borderColor}
            />
        ));
    }

    render() {
        const { labels } = this.state;

        return (
            <div>
               
                <div style={containerStyles}>
                    <Chart labels={labels} type="line">
                        {this.renderDatasets()}
                    </Chart>
                </div>
            </div>
        );
    }
}
