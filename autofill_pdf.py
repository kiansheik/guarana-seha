from pdfrw import PdfReader

template_pdf = PdfReader("Ficha Tecnica Cadastro 24.pdf")
annotations = template_pdf.pages[0]["/Annots"]
field_names = [annotation["/T"] for annotation in annotations if annotation["/Subtype"] == "/Widget"]
print("Field Names in PDF:", field_names)
