import React from 'react'
import Paper from '@material-ui/core/Paper';

export default function ErrorOccured(props) {
  return (
    <div style={{ padding: 20 }}>
      <Paper elevation={4} style={{ width: 400, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 250, padding: 20, fontWeight: 'bold', fontSize: 20, margin: '0 auto' }} >Error Occured </Paper>
    </div>
  )
}
