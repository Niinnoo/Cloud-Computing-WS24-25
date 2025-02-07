def generate_table_row(values, units):
    row = '<tr>'
    for value, unit in zip(values, units):
        row += f'<td style="border: 1px solid #ddd; padding: 8px;">{value}{unit}</td>'
    
    row += '</tr>'
    return row

def generate_table_header(values):
    header = '<tr style="background-color: #f2f2f2;">'
    for value in values:
        header += f'<th style="border: 1px solid #ddd; padding: 10px; text-align: left;">{value}</th>'
        
    header += '</tr>'
    return header