import React from 'react';
import Chart from '@bit/nexxtway.react-rainbow.chart';
import Dataset from '@bit/nexxtway.react-rainbow.dataset';
import ButtonGroup from '@bit/nexxtway.react-rainbow.button-group';
import Button from '@bit/nexxtway.react-rainbow.button';

const containerStyles = {
    width: 600,
};

const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');
const { faPlus, faMinus } = require('@fortawesome/free-solid-svg-icons');

export default class DoughnutChart extends React.Component {
    constructor(props) {
        super(props);
        this.titles = ['Data-Blue', 'Data-Purple', 'Data-Dark'];
        this.colors = ['#01b6f5', '#663398', '#061c3f'];
        this.state = {
            labels: ['Strongly Disagree', 'Disagree', 'Casual', 'Strongly Agree'],
            dataset: [
                {
                    value: 10,
                    color: '#fe4849',
                },
                {
                    value: 15,
                    color: '#ff6837',
                },
                {
                    value: 42,
                    color: '#ffcc00',
                },
                {
                    value: 33,
                    color: '#1ad1a3',
                },
            ],
        };
    }

    addData() {
        const { labels, dataset } = this.state;
        const newLabels = labels.concat(this.titles.shift());
        const newDataset = dataset.concat({
            value: Math.round(Math.random() * 100),
            color: this.colors.shift(),
        });
        this.setState({ labels: newLabels, dataset: newDataset });
    }

    removeData() {
        const { labels, dataset } = this.state;
        const lastLabel = labels[labels.length - 1];
        this.titles.unshift(lastLabel);
        const newLabels = labels.filter(l => l !== lastLabel);
        const lastData = dataset[dataset.length - 1];
        this.colors.unshift(lastData.color);
        const newDataset = dataset.slice(0, dataset.length - 1);
        this.setState({ labels: newLabels, dataset: newDataset });
    }

    renderDataset() {
        let data = [];
        let colors = [];
        const { dataset } = this.state;
        dataset.forEach(d => {
            data.push(d.value);
            colors.push(d.color);
        });

        return <Dataset title="Data" values={data} backgroundColor={colors} />;
    }

    render() {
        const { labels } = this.state;

        const noMoreTitles = this.titles.length === 0;
        const noMoreLabels = labels.length === 0;

        return (
            <div>
             
                <div style={containerStyles}>
                    <Chart labels={labels} type="doughnut" legendPosition="right" disableCurves>
                        {this.renderDataset()}
                    </Chart>
                </div>
            </div>
        );
    }
}
