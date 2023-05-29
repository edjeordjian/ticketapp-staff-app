import React from 'react';
import {View, Text, Dimensions, StyleSheet, ScrollView} from 'react-native';
import {Grid, LineChart, XAxis, YAxis, } from 'react-native-svg-charts';
import {BlankLine} from "./BlankLine";
import {Circle} from "react-native-svg";
import {statsScreenStyle} from "../styles/app/StatsScreenStyle";


export default function LineChartEntries({chartData, userEntries, fillShadowGradient}) {
    const yScale = [...new Set([...chartData.data].sort())];

    const xScale = chartData.labels;

    return (
        <View>
            <View style={{
                flexDirection: "row"
            }}>
                <View style={{flex: 0.1}}>
                    <YAxis
                        style={{
                            width: 330,
                            height: 300,
                            paddingRight: 220
                        }}
                        contentInset={{
                            top: 20,
                            bottom: 20,
                            left: 20,
                            right: 20
                        }}
                        data={yScale}
                        svg={{
                            fill: 'grey',
                            fontSize: 10,
                        }}
                    />
                </View>

                <View style={{flex: 0.9}}>
                    <LineChart
                        style={{
                            width: 390,
                            height: 300,
                            paddingLeft: 30,
                            paddingRight: 30
                        }}
                        data={chartData.data}
                        svg={{
                            stroke: 'rgb(134, 65, 244)',
                            strokeWidth: 2,
                            strokeLinecap: 'round'
                        }}
                        contentInset={{
                            top: 20,
                            bottom: 20,
                            left: 20,
                            right: 20
                        }}
                    >
                        <Grid />

                        {chartData.data.map((value, index) => (
                            <Circle
                                key={index}
                                cx={index * ((330 - 26 - 26) / (chartData.data.length - 1)) + 23}
                                cy={300 - (
                                        (value - Math.min(...chartData.data))
                                        / (
                                            Math.max(...chartData.data) - Math.min(...chartData.data)
                                        )
                                    ) * (300 - 20 - 20) - 20
                                }
                                r={4}
                                stroke="blue"
                                fill="blue"
                            />
                        ))}
                    </LineChart>
                </View>
            </View>

            <XAxis
                style={{
                    paddingTop: 20,
                    paddingLeft: 44,
                    height: 50,
                }}
                contentInset={{
                    top: 20,
                    bottom: 50,
                    left: 50,
                    right: 50
                }}
                data={[...Array(chartData.data.length)]}
                svg={{
                    rotation: -45,
                    fill: 'grey',
                    fontSize: 10,
                    originY: 10,
                    y: 10
                }}
                formatLabel={(value) => `${xScale[value]}`}
            />

            <BlankLine number={2}/>

            <Text style={statsScreenStyle.title}>Usuarios
            </Text>

            <ScrollView>
                    {
                    userEntries.map((entry, index) => (
                            <Text>       {entry.time} - {entry.name}
                            </Text>
                        ))
                    }
            </ScrollView>

            <BlankLine number={2}/>
        </View>
    );
}
