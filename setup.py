from setuptools import find_packages, setup

setup(
    name="cerebro",
    version="1.0.4",
    packages=find_packages(),
    python_requires=">=3.10.0",
    entry_points={
        "console_scripts": [
            "verba=goldenverba.server.cli:cli",
        ],
    },
    description="cerebro",
    classifiers=[
        "License :: OSI Approved :: BSD License",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
    ],
    include_package_data=True,
    install_requires=[
        "weaviate-client==3.25.0",
        "python-dotenv==1.0.0",
        "openai==0.27.9",
        "wasabi==1.1.2",
        "fastapi==0.102.0",
        "uvicorn[standard]==0.29.0",
        "click==8.1.7",
        "asyncio==3.4.3",
        "tiktoken==0.6.0",
        "requests==2.31.0",
        "pypdf==4.2.0",
        "python-docx==1.1.2",
        "httpx"
    ],
    extras_require={
        "dev": [
            "pytest",
            "wheel",
            "twine",
            "black>=23.7.0",
            "setuptools"
        ],
        "huggingface": [
            "sentence-transformers==3.0.1",
        ],
        "google": [
            "vertexai==1.46.0",
        ]
    },
)
