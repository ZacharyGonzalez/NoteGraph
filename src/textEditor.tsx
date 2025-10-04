export default function textEditor(setNotes: any, notes: Array<any>) {
    return (
        <div className="text-editor">
            <h2>Text Editor</h2>
            <textarea
                placeholder="Select a note to edit..."
                readOnly
            />
        </div>
    )
}   