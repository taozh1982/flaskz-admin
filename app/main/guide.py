import os

import markdown
from flask import render_template_string
from flaskz.utils import get_app_path, get_app_config

from . import main_bp

doc_mapping = {
    # 'index': 'guide/index.md',
    'manual': 'guide/manual.md',
    'install': 'guide/install.md',
    'version': 'guide/version.md',

    'error_404': './error/404.html',
}


@main_bp.route('/<lang>/guide/', defaults={'page': 'version'})
@main_bp.route('/<lang>/guide/<page>/', methods=['GET'])
def show_guide(lang, page):
    static_folder = get_app_config('APP_PAGE_STATIC_FOLDER') or 'app/cx_nms_page/'
    _md = get_app_path(static_folder,'doc', lang, doc_mapping.get(page) or f'guide/{page}.md')

    if os.path.exists(_md):
        try:
            with open(_md, 'r') as file:
                md_content = file.read()
            html_content = markdown.markdown(
                md_content,
                extensions=['fenced_code', 'codehilite', 'tables', 'toc']
            )
            _html = get_app_path(f'{static_folder}/doc/{lang}/guide/guide-template.html')
            with open(_html, 'r', encoding='utf-8') as file:
                html_file = file.read()
            return render_template_string(html_file, content=html_content, page_title=page)
        except Exception:
            pass

    return main_bp.send_static_file(doc_mapping.get('error_404')), 404
