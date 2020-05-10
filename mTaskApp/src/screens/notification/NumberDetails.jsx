import React, { useEffect, useState } from 'react'
import { Text, Icon, Layout } from '@ui-kitten/components'
import {StyleSheet} from 'react-native'

export default function NumberDetails({total, numOfAccept, numOfDecline}) {

    return (
        <React.Fragment>
            <Layout style={styles.spacingStyle}>
                <Icon name='people-outline' width={20} height={20} fill='#3366FF' />
                <Text style={styles.textStyle}>{total}</Text>
            </Layout>
            <Layout style={styles.spacingStyle}>
                <Icon name='checkmark-outline' width={20} height={20} fill='#3366FF' />
                <Text style={styles.textStyle}>{numOfAccept}</Text>
            </Layout>

            <Layout style={styles.spacingStyle}>
                <Icon name='close-outline' width={20} height={20} fill='#3366FF' />
                <Text style={styles.textStyle}>{numOfDecline}</Text>
            </Layout>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    spacingStyle: {
        flexDirection: 'row'
    },
    textStyle:{
        paddingHorizontal: 10
    }
})